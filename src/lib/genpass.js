import niceware from 'niceware'
import Leet from 'l33t'
import srp from 'secure-random-password'
import { LANG, TYPE } from './constants'

/**
 * GenPass
 * @param {string} type=passphrase
 * @param {number} length=4
 * @param {boolean} symbols=false
 * @param {boolean} numbers=false
 * @param {string} language=en
 * @param {string} delimeter='-'
 * @returns {string} Generated password
 */
export default function GenPass({
  type = TYPE.PASSPHRASE,
  length = 4,
  symbols = false,
  numbers = false,
  language = LANG.EN,
  delimeter = '-'
} = {}) {
  switch (type) {
    case TYPE.PASSPHRASE: {
      let passwordWords = getWords(length, language)
      if (symbols) {
        passwordWords = addSymbols(passwordWords)
      }
      if (numbers) {
        passwordWords = addNumbers(passwordWords)
      }
      return passwordWords.join(delimeter)
    }
    case TYPE.RANDOM: {
      return srp.randomString({
        length,
        avoidAmbiguous: true
      })
    }
    case TYPE.PIN: {
      return srp.randomPassword({
        length,
        characters: srp.digits
      })
    }
  }
}

/**
 * getWords
 * @param {number} length
 * @param {string} language
 * @returns {Array} Array of words
 */
function getWords(length, language) {
  switch (language) {
    case 'en':
      return niceware.generatePassphrase(length * 2)
  }
}

/**
 * addSymbols
 * @param {Array} passwordWords
 * @returns {Array} passwordWords with symbols
 */
function addSymbols(passwordWords = []) {
  const leet = new Leet({ numeric: false, random: false })

  leet.symbols = function () {
    return {
      a: ['@'],
      i: ['!'],
      s: ['$']
    }
  }
  return passwordWords.map((word) => leet.encode(word))
}

/**
 * addNumbers
 * @param {Array} passwordWords
 * @returns {Array} passwordWords with numbers
 */
function addNumbers(passwordWords = []) {
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
