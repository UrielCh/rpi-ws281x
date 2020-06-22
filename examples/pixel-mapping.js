const ws281x = require('../index.js');
const { toColor } = require('./common.js');

class Example {
    // offset: number;
    // config: IWS281xConfig & {width: number, height: number, map: string};
    constructor() {
        // Current pixel position
        this.offset = 0;

        // Set my Neopixel configuration

        // By setting width and height instead of number of leds
        // you may use named pixel mappings.
        // Currently "matrix" and "alternating-matrix" are
        // supported. You may also set the "map" property
        // to a custom Uint32Array to define your own map.
        this.config = {
            width: 13,
            height: 13,
            map: 'alternating-matrix',
        };

        // Configure ws281x
        ws281x.configure(this.config);
    }

    loop() {
        const leds = this.config.width * this.config.height;
        const pixels = new Uint32Array(leds);

        // Set a specific pixel
        pixels[this.offset] = 0xFF0000;

        // Move on to next
        this.offset = (this.offset + 1) % leds;

        // Render to strip
        ws281x.render(pixels);
    }

    run() {
        // Loop every 100 ms
        setInterval(this.loop.bind(this), 100);
    }
};

var example = new Example();
example.run();