/**
 * Get string hashcode.
 * @param {String} str - String
 * @return {number}
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

/**
 * Convert HEX to RGB colour value.
 * @param {String} hexString HEX colour string
 * @return {String}
 */
function hexToRGB(hexString) {
  return `rgb(${hexString
    .match(/[A-Za-z0-9]{2}/g)
    .map(function(v) {
      return parseInt(v, 16);
    })
    .join(',')})`;
}

/**
 * Get hexadecimal colour code from string.
 * @param {String} s - Label
 * @return {*} Hexadecimal colour string
 */
function getColourFromString(s) {
  return '#' + intToRGB(hashCode(s));
}

/**
 * Convert integer colour value to RGB.
 * @param {Number} i - Integer
 * @return {String} RGB colour string
 */
function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}

/**
 * Return hex string of color.
 * @param rgb RGB String e.g. rgb(255, 255, 255)
 */
function rgbToHex(rgb) {
  const rx = /[0-9]+/g;
  const rgbDigits = rgb.match(rx);
  if (rgbDigits.length === 3) {
    return rgbDigits.reduce((color, num) => {
      const hex = parseInt(num).toString(16);
      color += hex.length === 1 ? '0' + hex : hex;
      return color;
    }, '#');
  } else {
    return '#ffffff';
  }
}

export default {
  getColourFromString,
  hashCode,
  hexToRGB,
  intToRGB,
  rgbToHex,
};
