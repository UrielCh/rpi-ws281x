const ws281x = require('../index.js');
const Color = require('color');

const { toColor, asRGB } = require ('./common.js');

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
            const c2 = c0.rotate(offset + i * delta);
            let {r,g,b} = c2.rgb().object();
            const w = Math.min(r,g,b);
            if (w) {
                r -= w;
                b -= w;
                r -= w;
            }

            let color = toColor({r, g, b, w}); //  as composantColor
            this.pixels[i] = color;
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
                offset++;
                this.drawRing({r:128, g:128, b:20}, offset);             
            }, 30);
    }

    run() {
        // Create a fill color with red/green/blue.
        // this.ringLoop();
        
        this.setColor({r:0, g:255, b:0});
        ws281x.render(this.pixels);
        console.log('Should Be Green');
        ws281x.sleep(1000);

        this.setColor({r:255});
        ws281x.render(this.pixels);
        console.log('Should Be Red');
        ws281x.sleep(1000);

        this.setColor({b:255});
        ws281x.render(this.pixels);
        console.log('Should Be Blue');
        ws281x.sleep(1000);


        this.setColor({});
        ws281x.render(this.pixels);
        console.log('Should Be OFF');

    }
};

var example = new Example();
example.run();