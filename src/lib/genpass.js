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
  let passwordCandidateArray = niceware.generatePassphrase(length * 2)
  if (symbols) {
    const leet = new Leet({ numeric: false, random: false })

    leet.symbols = function () {
      return {
        a: ['@'],
        b: ['8'],
        s: ['$']
      }
    }
    passwordCandidateArray = passwordCandidateArray.map((word) =>
      leet.encode(word)
    )
  }
  if (numbers) {
    const leet = new Leet({ numeric: true, random: false })
    leet.numbers = function () {
      return {
        a: ['4'],
        b: ['8'],
        e: ['3'],
        o: ['0']
      }
    }
    passwordCandidateArray = passwordCandidateArray.map((word) =>
      leet.encode(word)
    )
  }
  return passwordCandidateArray.join(delimeter)
}

console.log(GenPass({ symbols: true }))
