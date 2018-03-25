const fs = require('fs');

/**
 * Return an object after parsing a JSON file. If the
 * file doesn't exist, it returns an empty object
 * @param {String} file
 * @return {Object}
 */
function jsonFileToObj(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

/**
 * Return an array with each word from the string
 * and all their letters become uppercase
 * @param {String} string
 * @return {Array}
 */
function toArrayOfWords(string) {
  return string
    .trim()
    .split(' ')
    .map(e => e.toLowerCase());
}

/**
 * Return a regular expression from the string with the same
 * start and final. It includes the '+' and '-' sign
 * @param {String} string
 * @return {RegExp}
 */
function toRegExp(string) {
  return new RegExp(
    `^${string.replace(/\+/g, '\\+').replace(/-/g, '\\-')}$`,
    'gi',
  );
}

module.exports = {
  jsonFileToObj,
  toArrayOfWords,
  toRegExp,
};
