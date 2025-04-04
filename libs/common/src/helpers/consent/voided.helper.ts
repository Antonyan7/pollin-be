import {Content} from 'pdfmake/interfaces'

const voidedLabel = (i: number): string => `
  <svg>
    <g transform="translate(0 ${i * 622}pt) rotate(-23.23deg)">
      <text x="-138pt" y="480pt" font-family="GeomanistBlack" font-size="403" fill="rgba(0, 0, 0, 0.05)">
        VOIDED
      </text>
    </g>
`

export const voidedBackground: Content = {
  absolutePosition: {x: 0, y: 0},
  svg: `<svg>` + [...Array(4).keys()].map(voidedLabel).join(' ') + `</svg>`,
}
