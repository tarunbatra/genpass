/**
 * @param opts object
 * @param opts.numbers boolean
 * @param opts.symbols boolean
 * @param opts.language string
 */
import niceware from 'niceware'
import Leet from 'l33t'

export default function GenPass({
  length = 4,
  symbols = false,
  numbers = false,
  language = 'en',
  delimeter = '-'
} = {}) {
  let passwordWords = getWords(length, language)
  if (symbols) {
    passwordWords = addSymbols(passwordWords)
  }
  if (numbers) {
    passwordWords = addNumbers(passwordWords)
  }
  return passwordWords.join(delimeter)
}

console.log(GenPass({ symbols: true }))
console.log(GenPass({ numbers: true }))

function getWords(length, language) {
  switch (language) {
    case 'en':
      return niceware.generatePassphrase(length * 2)
  }
}

function addSymbols(passwordWords) {
  const leet = new Leet({ numeric: false, random: false })

  leet.symbols = function () {
    return {
      a: ['@'],
      b: ['8'],
      s: ['$']
    }
  }
  return passwordWords.map((word) => leet.encode(word))
}

function addNumbers(passwordWords) {
  const leet = new Leet({ numeric: true, random: false })
  leet.symbols = function () {
    return {}
  }
  leet.numeric = function () {
    return {
      a: ['4'],
      b: ['8'],
      e: ['3'],
      o: ['0']
    }
  }
  return passwordWords.map((word) => leet.encode(word))
}
