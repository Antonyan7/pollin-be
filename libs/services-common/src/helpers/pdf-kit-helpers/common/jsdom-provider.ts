/* eslint-disable @typescript-eslint/no-require-imports */
const htmlToPdfMake = require('html-to-pdfmake')

import * as jsdom from 'jsdom'

export class JSDOMProvider {
  static getContent<T>(content: T): string {
    const {JSDOM} = jsdom
    const {window} = new JSDOM('')

    return htmlToPdfMake(content, {window: window})
  }
}
