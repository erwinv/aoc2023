import * as _ from 'lodash-es'
import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'

function isDigit(c: string) {
  return c >= '0' && c <= '9'
}

export async function solve(input: Readable) {
  let sum = 0

  for await (const line of createInterface(input)) {
    if (!line) continue

    const firstDigit = _.find(line, isDigit)
    const lastDigit = _.findLast(line, isDigit)
    sum += _.toNumber(`${firstDigit}${lastDigit}`)
  }

  return sum
}
