const ws281x = require('../index.js');
const { toColor } = require ('./common.js');

class Example {
    // offset: number;
    // config: IWS281xConfig & {leds : number};

    constructor() {
        // Current pixel position
        this.offset = 0;

        // Set my Neopixel configuration
        this.config = {leds: 24};

        // Configure ws281x
        ws281x.configure(this.config);
    }

    loop() {
        const pixels = new Uint32Array(this.config.leds);

        // Set a specific pixel
        pixels[this.offset] = 0xFF0000;

        // Move on to next
        this.offset = (this.offset + 1) % this.config.leds;

        // Render to strip
        ws281x.render(pixels);
    }

    run() {
        // Loop every 100 ms
        setInterval(this.loop.bind(this), 100);
    }
};

const example = new Example();
example.run();