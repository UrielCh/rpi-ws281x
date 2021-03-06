/**
 * @typedef {Object} composantColor
 * @property {number} [r] - 
 * @property {number} [g] - 
 * @property {number} [b] - 
 * @property {number} [w] - 
 */
/**
 * @param {composantColor} composant 
 */
function toColor(composant) {
    const {r=0,g=0,b=0,w=0} = composant;
    return (w << 24) | (r << 16) | (g << 8) | b;
}

/**
 * 
 * @param {composantColor} object 
 */
function asRGB(object) {
    if (!object.r) {
        object.r = 0;
    }
    if (!object.g) {
        object.g = 0;
    }
    if (!object.b) {
        object.b = 0;
    }
}

/**
 * 
 * @param {composantColor} c2 
 */
function useWhite(c2) {
    let {r,g,b} = c2;
    const w = Math.min(r,g,b);
    if (!w)
        return;
    r -= w;
    g -= w;
    b -= w;
    c2.w = w;
}

module.exports = { toColor, asRGB, useWhite };
