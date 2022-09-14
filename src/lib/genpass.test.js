import { TYPE } from './constants'
import genPass from './genpass'

describe('lib', () => {
  describe('used without any options', () => {
    it('returns a passphrase', () => {
      const password = genPass()
      expect(password).toEqual(expect.stringMatching(/^\w*-\w*-\w*-\w*$/))
    })
  })

  describe('used with length 5', () => {
    it('returns a passphrase with 5 words', () => {
      const password = genPass({ length: 5 })
      expect(password).toEqual(expect.stringMatching(/^\w*-\w*-\w*-\w*-\w*$/))
    })
  })

  describe('used with numbers true', () => {
    it('returns a passphrase with digits', () => {
      const password = genPass({ numbers: true })
      expect(password).toEqual(expect.stringMatching(/\d+/))
    })
  })

  describe('used with symbols true', () => {
    it('returns a passphrase with symbols', () => {
      const password = genPass({ symbols: true })
      expect(password).toEqual(expect.stringMatching(/[@!$]+/))
    })
  })

  describe('used with type=random', () => {
    it('returns a random string', () => {
      const password1 = genPass({ type: TYPE.RANDOM })
      const password2 = genPass({ type: TYPE.RANDOM })
      expect(password1).not.toEqual(password2)
    })
  })
  describe('used with type=pin', () => {
    it('returns a random 4 digit pin', () => {
      const password = genPass({ type: TYPE.PIN })
      expect(password).toEqual(expect.stringMatching(/^\d{4}$/))
    })
  })

  describe('used with type=pin and length=16', () => {
    it('returns a random 16-digit pin', () => {
      const password = genPass({ type: TYPE.PIN, length: 16 })
      expect(password).toEqual(expect.stringMatching(/^\d{16}$/))
    })
  })
})
