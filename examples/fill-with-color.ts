import {WS281x, IWS281xConfig} from '../index';
import Color from "color";

const ws281x = new WS281x();

interface composantColor {
    r?: number;
    g?: number;
    b?: number;
    w?: number;
}


function toColor(composant: composantColor) {
    const {r=0,g=0,b=0,w=0} = composant;
    return (w << 24) | (r << 16) | (g << 8) | b;
}

class Example {
    public config: IWS281xConfig;
    constructor() {
        this.config = {
            leds: 24,
            dma: 10,
            brightness: 255,
            gpio: 18,
            strip: 'grbw',
        };
        // Configure ws281x
        ws281x.configure(this.config);
    }

    run() {
        // Create a pixel array matching the number of leds.
        // This must be an instance of Uint32Array.
        const leds = this.config.leds as number;
        const pixels = new Uint32Array(leds);


        // Create a fill color with red/green/blue.
        {
            
            let c0 = Color({r:255});
            console.log('Should Be RED');
            for (let i = 0; i < leds; i++) {
                const c2 = c0.rotate(i);
                let color = toColor(c2.object() as composantColor);
                pixels[i] = color;
            }
            // Render to strip
            ws281x.render(pixels);
        }
        ws281x.sleep(1000);

        // Create a fill color with red/green/blue.
        // let color = toColor({g:255})
        // console.log('Should Be Green');
        // for (let i = 0; i < this.config.leds; i++)
        //     pixels[i] = color;
        // // Render to strip
        // ws281x.render(pixels);
        // ws281x.sleep(1000);
// 
// 
        // // Create a fill color with red/green/blue.
        // color = toColor({b:255})
        // console.log('Should Be Blue');
        // for (let i = 0; i < this.config.leds; i++)
        //     pixels[i] = color;
        // // Render to strip
        // ws281x.render(pixels);
        // ws281x.sleep(1000);
// 
// 
        // // Create a fill color with red/green/blue.
        // color = toColor({w:255})
        // console.log('Should Be white');
        // for (let i = 0; i < this.config.leds; i++)
        //     pixels[i] = color;
        // // Render to strip
        // ws281x.render(pixels);
        // ws281x.sleep(1000);
    }
};

var example = new Example();
example.run();