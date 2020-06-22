const ws281x = require('../index.js');
const Color = require('color');

const { toColor, asRGB, useWhite} = require ('./common.js');

/**
 * @typedef {Object} colorData
 * @property {number} [r] - 
 * @property {number} [g] - 
 * @property {number} [b] - 
 * @property {number} [a] - 
 */

class Example {
    constructor() {
        this.config = {
            leds: 126,
            dma: 10,
            brightness: 255,
            gpio: 18,
            strip: 'grbw',
        };
        // Configure ws281x
        ws281x.configure(this.config);
        this.pixels = new Uint32Array(this.config.leds);
    }

    /**
     * @param {colorData} courceColor 
     * @param {number} offset 
     */
    drawRing(courceColor, offset) {
        asRGB(courceColor);
        const leds = this.config.leds;// as number;
        const delta = 360 / leds;
        let c0 = Color(courceColor);
        for (let i = 0; i < leds; i++) {
            const c2 = c0.rotate(offset + i * delta).rgb().object();
            useWhite(c2);
            // console.log(c2);
            this.pixels[i] = toColor(c2);
        }
        // Render to strip
        ws281x.render(this.pixels);
    }

    /**
     * @param {colorData} color 
     */
    setColor(color) {
        const leds = this.config.leds;// as number;
        const color2 = toColor(color); //  as composantColor
        for (let i = 0; i < leds; i++) {
            this.pixels[i] = color2;
        }
        ws281x.render(this.pixels);
    }

    ringLoop() {
        let offset = 0;
            setInterval(() => {
                offset+=2;
                this.drawRing({r:255, g:255, b:60}, offset);             
            }, 30);
    }

    run() {
        // Create a fill color with red/green/blue.
        
        this.setColor({r:0, g:255, b:0});
        ws281x.render(this.pixels);
        console.log('Should Be Green');
        ws281x.sleep(350);

        this.setColor({r:255});
        ws281x.render(this.pixels);
        console.log('Should Be Red');
        ws281x.sleep(350);

        this.setColor({b:255});
        ws281x.render(this.pixels);
        console.log('Should Be Blue');
        ws281x.sleep(350);

        this.setColor({});
        ws281x.render(this.pixels);
        console.log('Should Be OFF');
        ws281x.sleep(200);
        this.ringLoop();
    }
};

var example = new Example();
example.run();