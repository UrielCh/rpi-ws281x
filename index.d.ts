/// <reference types="node" />
export interface IWS281xConfig {
    leds?: number;
    dma?: number;
    brightness?: number;
    gpio?: number;
    strip?: string; // "rgb" | "rbg" | "grb" | "gbr" | "bgr" | "brg" | "rgbw" | "rbgw" | "grbw" | "grbw" | "gbrw" | "brgw" | "bgrw";
}

export declare class WS281x {
    map: Uint32Array;
    leds: number;
    constructor();
    configure(options: IWS281xConfig & {
        width?: number;
        height?: number;
        map?: string | Uint32Array;
        leds?: number;
    }): void;
    reset(): void;
    sleep(ms: number): void;
    render(pixels: Buffer | Uint32Array): void;
}
