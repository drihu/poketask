/* eslint-disable no-console */
const fs = require('fs');

/**
 * Copy a file from src to dest
 * @param {String} src
 * @param {String} dest
 */
function copyFile(src, dest) {
  const data = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dest, data);
}

/**
 * Return an object after parsing a JSON file. If the
 * file doesn't exist, it returns an empty object
 * @param {String} file
 * @returns {Object}
 */
function fromJsonFileToObj(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return {};
    throw err;
  }
}

/**
 * Return an array with each word from the string
 * and all their letters become lowercase
 * @param {String} string
 * @returns {Array}
 */
function toArrayOfWords(string) {
  return string
    .trim()
    .replace(/ +(?= )/g, '')
    .split(' ')
    .map(e => e.toLowerCase());
}

/**
 * Return a regular expression from the string with the same
 * start and final. It includes the '+' and '-' sign
 * @param {String} string
 * @returns {RegExp}
 */
function toRegExp(string) {
  return new RegExp(
    `^${string.replace(/\+/g, '\\+').replace(/-/g, '\\-')}$`,
    'i',
  );
}

module.exports = {
  copyFile,
  fromJsonFileToObj,
  toArrayOfWords,
  toRegExp,
};
