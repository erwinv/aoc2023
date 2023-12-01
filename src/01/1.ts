import * as _ from 'lodash-es'
import { createInterface } from 'node:readline'

function isDigit(c: string) {
  return c >= '0' && c <= '9'
}

let sum = 0

for await (const line of createInterface(process.stdin)) {
  if (!line) continue

  const firstDigit = _.find(line, isDigit)
  const lastDigit = _.findLast(line, isDigit)
  sum += _.toNumber(`${firstDigit}${lastDigit}`)
}

console.log(sum)
