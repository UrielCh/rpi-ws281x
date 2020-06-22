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

export {toColor}