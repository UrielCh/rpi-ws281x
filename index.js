// import path from 'path';
const addon = require('bindings')('rpi-ws281x');

// export interface IWS281xConfig {
//     leds?: number; // Number of leds in my strip
//     dma?: number; // Use DMA 10 (default 10)
//     brightness?: number; // Set full brightness, a value from 0 to 255 (default 255)
//     gpio?: number; // Set the GPIO number to communicate with the Neopixel strip (default 18)
//     // The RGB sequence may vary on some strips. Valid values
//     // are "rgb", "rbg", "grb", "gbr", "bgr", "brg"
//     // and "rgbw", "rbgw", "grbw", "grbw", "gbrw", "brgw", "bgrw" for SK6812 STRIP
//     // Default is "rgb".
//     strip?: "rgb" | "rbg" | "grb" | "gbr" | "bgr" | "brg" |  "rgbw" | "rbgw" | "grbw" | "grbw" | "gbrw" | "brgw" | "bgrw";
// }

/**
 * @typedef {Object} IWS281xConfig
 * @property {number} [leds] - 
 * @property {number} [dma] - 
 * @property {number} [brightness] - 
 * @property {number} [gpio] - 
 * @property {string} [strip] - {"rgb" | "rbg" | "grb" | "gbr" | "bgr" | "brg" |  "rgbw" | "rbgw" | "grbw" | "grbw" | "gbrw" | "brgw" | "bgrw"}
 */

class WS281x {
    // public map!: Uint32Array;
    // public leds!: number;

    constructor() {
        /**
         * @type {Uint32Array | undefined}
         */
        this.map  = undefined;
        /**
         * @type {number | undefined}
         */
        this.leds = undefined;
    }
    /**
     * 
     * @param {IWS281xConfig & {width?: number, height?: number, map?: string | Uint32Array, leds?: number}} options 
     */
    configure(options) {
        var {width, height, map, leds} = options;
        // , ...options
        if (width || height) {
            if (!width) {
                throw new Error('Must specify width > 0 if height is specified.');
            }
            if (!height) {
                throw new Error('Must specify height > 0 if width is specified.');
            }
            if (leds) {
                throw new Error('Please do not specify leds when both width and height are specified.');
            }
            leds = width * height;
            if (typeof map == 'string') {
                if (map == 'matrix') {
                    map = new Uint32Array(width * height);
                    for (let i = 0; i < map.length; i++) 
                        map[i] = i;
                }
                else if (map == 'alternating-matrix') {
                    map = new Uint32Array(width * height);
                    for (let i = 0; i < map.length; i++) {
                        const row = Math.floor(i / width), col = i % width;
                        if ((row % 2) === 0) {
                            map[i] = i;
                        }
                        else {
                            map[i] = (row+1) * width - (col+1);
                        }
                    }        
                }
            }
        }

        // Make sure the number of leds are specified
        if (!leds ) {
            throw new Error('Number of leds must be defined. Either by leds or by width and height.');
        }
    
        // If no map specified, create a default one...
        if (!map) {
            map = new Uint32Array(leds);
            for (var i = 0; i < leds; i++)
                map[i] = i;
        }
        
        // Make sure we have a correct instance of pixel mapping
        if (!(map instanceof Uint32Array))
            throw new Error('Pixel mapping must be an Uint32Array.');

        if (map.length != leds) 
            throw new Error('Pixel mapping array must be of the same size as the number of leds.');

        this.map  = map;
        this.leds = leds;
        addon.configure({...options, leds});
    }

    reset() {
        if (this.leds != undefined) {
            this.render(new Uint32Array(this.leds));
            addon.reset();
        }
    }
    /**
     * 
     * @param {number} ms 
     */
    sleep(ms) {
        addon.sleep(ms);
    }
    /**
     * 
     * @param {Buffer | Uint32Array} pixels 
     */
    render(pixels) {
        if (this.map != undefined) {
            // Convert to Uint32Array if a Buffer
            if (pixels instanceof Buffer)
                pixels = new Uint32Array(pixels.buffer, pixels.byteOffset);
            if (this.leds != pixels.length)
                throw new Error('Pixels must be of same length as number of leds in render().');
            addon.render(pixels, this.map);
        }
    }
}

module.exports = new WS281x();
