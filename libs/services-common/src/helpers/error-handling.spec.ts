import {parseError} from './error-handling'

describe('Error handling functions calls', () => {
  it(`Should call parseError() function & return 'message' and 'stack' fields`, () => {
    const error = new Error()
    error.message = 'Message of error'
    error.stack = 'Stack field of error'

    expect(parseError(error)).toMatchObject({
      errorInfo: {message: 'Message of error', stack: 'Stack field of error'},
    })
  })

  it(`Should call parseError() function & return 'message' field`, () => {
    const error = new Error()
    error.message = 'Message of error'

    expect(parseError(error)).toMatchObject({
      errorInfo: {message: 'Message of error'},
    })
  })

  it(`Should call parseError() function & return default error value and 'stack' field`, () => {
    const error = new Error()
    error.stack = 'Stack field of error'

    expect(parseError(error)).toMatchObject({
      errorInfo: {message: '', stack: 'Stack field of error'},
    })
  })
})
