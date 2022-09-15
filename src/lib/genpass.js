import Leet from 'l33t'
import srp from 'secure-random-password'
import { LANG, TYPE, MAX_PASSPHRASE_SIZE } from './constants'
import { ENGLISH } from './dictionary/english'
import { FRENCH } from './dictionary/french'
import { SPANISH } from './dictionary/spanish'
import randomBytes from 'randombytes'
import axios from 'axios'
import niceware from 'niceware'
// import checkPwnedPasswords from 'check-pwnedpasswords'
const crypto = require('crypto');

/**
 * GenPass
 * @param {string} type=passphrase
 * @param {number} length=4
 * @param {boolean} symbols=false
 * @param {boolean} numbers=false
 * @param {string} language=en
 * @param {string} delimeter='-'
 * @param {boolean} checkForPwned=false
 * @returns {string} Generated password
 */
export default async function GenPass({
                                        type = TYPE.PASSPHRASE,
                                        length = 4,
                                        symbols = false,
                                        numbers = false,
                                        language = LANG.EN,
                                        delimeter = '-',
                                        checkForPwned = false
                                      } = {}) {
  let generatedPassword;

  if (checkForPwned && type !== TYPE.PIN) {
    let generateAnotherPassword = true;
    let generateCount = 0;

    while (generateAnotherPassword && generateCount < 5) {
      generatedPassword = generatePassword(type, length, symbols, numbers, language, delimeter);

      const hash = crypto.createHash('sha1').update(generatedPassword).digest('hex').toUpperCase();
      const range = hash.substr(0, 5);
      const remainder = hash.substr(5);

      const response = await axios.get(`https://api.pwnedpasswords.com/range/${range}`)
      let pwnedResult = response.data
      const match = pwnedResult.split('\r\n').find((hashRemainder) => hashRemainder.startsWith(remainder));
      let pwned = false;
      let occurrences = 0;
      if (match) {
        pwned = true;
        occurrences = parseInt(match.split(':')[1], 10);
      }

      if (!pwned) {
        generateAnotherPassword = false
      } else {
        console.debug("generated password '%s' found in pwned list for %d times, generating again", generatedPassword, occurrences)
      }
      generateCount++;
    }
  } else {
    generatedPassword = generatePassword(type, length, symbols, numbers, language, delimeter);
  }

  return generatedPassword;
}

function generatePassword(type, length, symbols, numbers, language, delimeter) {
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

  if (language !== LANG.ES || language !== LANG.FR) {
    return niceware.generatePassphrase(length * 2)
  }

  let dictionary = ENGLISH
  switch (language) {
    case LANG.FR:
      dictionary = FRENCH
      break
    case LANG.ES:
      dictionary = SPANISH
      break
  }

  return generatePassphrase(length * 2, dictionary)
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


/**
 * From niceware:
 * Generates a random passphrase with the specified number of bytes.
 * NOTE: `size` must be an even number.
 * @param {number} size The number of random bytes to use
 * @param {Array} wordlist dictionary
 * @returns {Array.<string>}
 */
function generatePassphrase(size/* : number */, wordlist) {
  if (typeof size !== 'number' || size < 0 || size > MAX_PASSPHRASE_SIZE) {
    throw new Error(`Size must be between 0 and ${MAX_PASSPHRASE_SIZE} bytes.`)
  }
  const bytes = randomBytes(size)
  return bytesToPassphrase(bytes, wordlist)
}

/**
 * From niceware:
 * Converts a byte array into a passphrase.
 * @param {Buffer} bytes The bytes to convert
 * @param {Array} wordlist dictionary
 * @returns {Array.<string>}
 */
function bytesToPassphrase(bytes, wordlist) {
  // XXX: Uint8Array should only be used when this is called in the browser
  // context.
  if (!Buffer.isBuffer(bytes) &&
    !(typeof window === 'object' && bytes instanceof window.Uint8Array)) {
    throw new Error('Input must be a Buffer or Uint8Array.')
  }
  if (bytes.length % 2 === 1) {
    throw new Error('Only even-sized byte arrays are supported.')
  }
  const words = []
  const totalWordsLength = wordlist.length;
  for (const entry of bytes.entries()) {
    const index = entry[0]
    const byte = entry[1]
    const next = bytes[index + 1]
    if (index % 2 === 0) {
      // wordList from our dictionary is small so updated the logic to get the wordIndex
      // const wordIndex = byte * 256 + next
      const wordIndex = totalWordsLength - ( byte + next )
      const word = wordlist[wordIndex]
      if (!word) {
        throw new Error('Invalid byte encountered')
      } else {
        words.push(word)
      }
    }
  }
  return words
}
