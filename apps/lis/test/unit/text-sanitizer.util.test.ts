import {handleStringEscapeCharacters} from '@apps/lis/test-result/helper/util/text-sanitizer.util'

const textWitUnexpectedSymbols =
  'Although generally \\E\\ recognized as a non-pathogen,\\.br\\Blastocystis hominis may have \\R\\ pathogenic\\.br\\potential when present \\ in high numbers or in\\.br\\immunocompr'

const textWithLongSpacesAndSpecialChars =
  'The specimen consists of one beige-tan piece measuring 8  mm in          \\.br\\         greatest dimension.                                                      \\.br\\         Embedded in toto.                                                        \\.br\\'

describe('Test Result helper functions => cal', () => {
  it('Should call handleStringEscapeCharacters util function', () => {
    const text = handleStringEscapeCharacters(textWitUnexpectedSymbols)

    expect(text).not.toContain('\\.br\\')
    expect(text).not.toContain('\\R\\')
    expect(text).not.toContain('\\E\\')
  })

  it('Should call handleStringEscapeCharacters util function', () => {
    const text = handleStringEscapeCharacters(textWithLongSpacesAndSpecialChars)

    expect(text).not.toContain('\\.br\\')
    expect(text).not.toContain('\\R\\')
    expect(text).not.toContain('\\E\\')
    expect(text).not.toContain('  ')
  })
})
