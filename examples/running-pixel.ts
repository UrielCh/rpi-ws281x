import {WS281x, IWS281xConfig} from '../index';

const ws281x = new WS281x();

function toColor(composant: {r?:number, g?: number, b?:number, w?: number}) {
    const {r=0,g=0,b=0,w=0} = composant;
    return (w << 24) | (r << 16) | (g << 8) | b;
}

class Example {
    offset: number;
    config: IWS281xConfig & {leds : number};

    constructor() {
        // Current pixel position
        this.offset = 0;

        // Set my Neopixel configuration
        this.config = {leds:24};

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