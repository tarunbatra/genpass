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
})
