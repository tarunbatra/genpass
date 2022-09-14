import { TYPE } from './constants'
import genPass from './genpass'

describe('lib', () => {
  describe('used without any options', () => {
    it('returns a passphrase', async () => {
      const password = await genPass()
      expect(password).toEqual(expect.stringMatching(/^\w*-\w*-\w*-\w*$/))
    })
    it('returns a passphrase with pwned check', async () => {
      const password = await genPass({ checkForPwned: true})
      expect(password).toEqual(expect.stringMatching(/^\w*-\w*-\w*-\w*$/))
    })
  })

  describe('used with length 5', () => {
    it('returns a passphrase with 5 words', async () => {
      const password = await genPass({ length: 5 })
      expect(password).toEqual(expect.stringMatching(/^\w*-\w*-\w*-\w*-\w*$/))
    })
    it('returns a passphrase with 5 words with pwned check', async () => {
      const password = await genPass({ length: 5, checkForPwned: true })
      expect(password).toEqual(expect.stringMatching(/^\w*-\w*-\w*-\w*-\w*$/))
    })
  })

  describe('used with numbers true', () => {
    it('returns a passphrase with digits', async () => {
      const password = await genPass({ numbers: true })
      expect(password).toEqual(expect.stringMatching(/\d+/))
    })
    it('returns a passphrase with digits with pwned check', async () => {
      const password = await genPass({ numbers: true, checkForPwned: true })
      expect(password).toEqual(expect.stringMatching(/\d+/))
    })
  })

  describe('used with symbols true', () => {
    it('returns a passphrase with symbols', async () => {
      const password = await genPass({ symbols: true })
      expect(password).toEqual(expect.stringMatching(/[@!$]+/))
    })
    it('returns a passphrase with symbols with pwned check', async () => {
      const password = await genPass({ symbols: true, checkForPwned: true })
      expect(password).toEqual(expect.stringMatching(/[@!$]+/))
    })
  })

  describe('used with type=random', () => {
    it('returns a random string', async () => {
      const password1 = await genPass({ type: TYPE.RANDOM })
      const password2 = await genPass({ type: TYPE.RANDOM })
      expect(password1).not.toEqual(password2)
    })
    it('returns a random string with pwned check', async () => {
      const password1 = await genPass({ type: TYPE.RANDOM, checkForPwned: true })
      const password2 = await genPass({ type: TYPE.RANDOM, checkForPwned: true })
      expect(password1).not.toEqual(password2)
    })
  })
  describe('used with type=pin', () => {
    it('returns a random 4 digit pin', async () => {
      const password = await genPass({ type: TYPE.PIN })
      expect(password).toEqual(expect.stringMatching(/^\d{4}$/))
    })

    it('returns a random 4 digit pin with pwned check', async () => {
      const password = await genPass({ type: TYPE.PIN, checkForPwned: true })
      expect(password).toEqual(expect.stringMatching(/^\d{4}$/))
    })
  })

  describe('used with type=pin and length=16', () => {
    it('returns a random 16-digit pin', async () => {
      const password = await genPass({ type: TYPE.PIN, length: 16 })
      expect(password).toEqual(expect.stringMatching(/^\d{16}$/))
    })
    it('returns a random 16-digit pin with pwned check', async () => {
      const password = await genPass({ type: TYPE.PIN, length: 16, checkForPwned: true })
      expect(password).toEqual(expect.stringMatching(/^\d{16}$/))
    })
  })
})
