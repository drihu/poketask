function firstLetterToUpperCase(string) {
  return string
    .split('')
    .map((e, i) => i === 0 ? e.toUpperCase() : e)
    .join('')
}

module.exports = {
  firstLetterToUpperCase,
};
