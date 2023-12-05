import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'
import { skip, split, splitBy, unshift } from '../utils.js'

export async function solve(input: Readable) {
  let sum = 0

  for await (const line of createInterface(input)) {
    if (!line) continue

    const card = unshift(skip(1, split(line, ': ')))
    if (!card) continue

    const cardSections = split(card, ' | ')

    const winning = new Set<number>()

    for (const num of splitBy(unshift(cardSections) ?? '', (c) => c === ' ')) {
      winning.add(Number(num))
    }

    let won = 0
    for (const num of splitBy(unshift(cardSections) ?? '', (c) => c === ' ')) {
      if (winning.has(Number(num))) {
        won++
      }
    }
    const points = won > 0 ? Math.pow(2, won - 1) : 0
    sum += points
  }

  return sum
}
