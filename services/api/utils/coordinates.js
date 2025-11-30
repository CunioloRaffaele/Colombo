/**
 * Verifica che coords sia un array di almeno 3 coppie [lng, lat] numeriche
 * @param {Array} coords
 * @returns {boolean}
 */
function isValidCoordinatesArray(coords) {
  return Array.isArray(coords) &&
    coords.length >= 3 &&
    coords.every(c => Array.isArray(c) &&
      c.length === 2 &&
      typeof c[0] === 'number' &&
      typeof c[1] === 'number');
}

module.exports = { isValidCoordinatesArray };
