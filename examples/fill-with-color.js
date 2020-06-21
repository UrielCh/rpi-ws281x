var ws281x = require('../index.js');

class Example {

    constructor() {
        this.config = {};

        // Number of leds in my strip
        this.config.leds = 24;

        // Use DMA 10 (default 10)
        this.config.dma = 10;

        // Set full brightness, a value from 0 to 255 (default 255)
        this.config.brightness = 255;

        // Set the GPIO number to communicate with the Neopixel strip (default 18)
        this.config.gpio = 18;

        // The RGB sequence may vary on some strips. Valid values
        // are "rgb", "rbg", "grb", "gbr", "bgr", "brg"
        // and "rgbw", "rbgw", "grbw", "grbw", "gbrw", "brgw", "bgrw" for SK6812 STRIP
        // Default is "rgb".
        this.config.strip = 'grbw';

        // Configure ws281x
        ws281x.configure(this.config);
    }

    run() {
        // Create a pixel array matching the number of leds.
        // This must be an instance of Uint32Array.
        const pixels = new Uint32Array(this.config.leds);

        // Create a fill color with red/green/blue.
        let red = 255, green = 0, blue = 0;
        let color = (red << 16) | (green << 8) | blue;
	console.log('Should Be RED');
        for (let i = 0; i < this.config.leds; i++)
            pixels[i] = color;
        // Render to strip
        ws281x.render(pixels);
	ws281x.sleep(1000);


        // Create a fill color with red/green/blue.
        red = 0, green = 255, blue = 0;
        color = (red << 16) | (green << 8) | blue;
        console.log('Should Be Green');
        for (let i = 0; i < this.config.leds; i++)
            pixels[i] = color;
        // Render to strip
        ws281x.render(pixels);
        ws281x.sleep(1000);


        // Create a fill color with red/green/blue.
        red = 0, green = 0, blue = 255;
        color = (red << 16) | (green << 8) | blue;
        console.log('Should Be Blue');
        for (let i = 0; i < this.config.leds; i++)
            pixels[i] = color;
        // Render to strip
        ws281x.render(pixels);
        ws281x.sleep(1000);


        // Create a fill color with red/green/blue.
        red = 0, green = 0, blue = 0;
	let white = 255;
        color = (white << 24) | (red << 16) | (green << 8) | blue;
        console.log('Should Be white');
        for (let i = 0; i < this.config.leds; i++)
            pixels[i] = color;
        // Render to strip
        ws281x.render(pixels);
        ws281x.sleep(1000);

    }
};

var example = new Example();
example.run();
