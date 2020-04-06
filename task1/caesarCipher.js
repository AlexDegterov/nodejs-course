'use strict';
const LETTERS_EN_SMALL = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];
const LETTERS_EN_BIG = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];
const LETTERS_COUNT = LETTERS_EN_SMALL.length - 1;

class conversionText {
  transform(string, programOptions) {
    if (programOptions.action == 'encode') {
      return this.encode(string, programOptions.shift);
    }
    return this.decode(string, programOptions.shift);
  }

  encode(string, shift) {
    const results = string.split('').map(letter => {
      const numSmall = LETTERS_EN_SMALL.indexOf(letter);
      const numBig = LETTERS_EN_BIG.indexOf(letter);
      if (!~numSmall && !~numBig) return letter;
      let numShift = ~numSmall ? numSmall + +shift : numBig + +shift;
      numShift =
        numShift <= LETTERS_COUNT ? numShift : numShift - LETTERS_COUNT - 1;
      return ~numSmall ? LETTERS_EN_SMALL[numShift] : LETTERS_EN_BIG[numShift];
    });
    return results.join('');
  }

  decode(string, shift) {
    const results = string.split('').map(letter => {
      const numSmall = LETTERS_EN_SMALL.indexOf(letter);
      const numBig = LETTERS_EN_BIG.indexOf(letter);
      if (!~numSmall && !~numBig) return letter;
      let numShift = ~numSmall ? numSmall - +shift : numBig - +shift;
      numShift = numShift >= 0 ? numShift : LETTERS_COUNT + numShift + 1;
      return ~numSmall ? LETTERS_EN_SMALL[numShift] : LETTERS_EN_BIG[numShift];
    });
    return results.join('');
  }
}

module.exports = new conversionText();
