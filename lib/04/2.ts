import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'
import { skip, split, splitBy, unshift } from '../utils.js'

class CardPile {
  #counts: Record<number, number> = {}

  numCopies(n: number) {
    return this.#counts[n] ?? 0
  }

  countAll() {
    let sum = 0
    for (const n in this.#counts) {
      sum += this.#counts[n]
    }
    return sum
  }

  incrBy(n: number, by = 1) {
    if (!this.#counts[n]) {
      this.#counts[n] = by
    } else {
      this.#counts[n] = this.#counts[n] + by
    }
  }

  incr(n: number) {
    this.incrBy(n, 1)
  }

  incrRangeBy(start: number, end: number, by = 1) {
    for (let i = start; i <= end; i++) {
      this.incrBy(i, by)
    }
  }
}

export async function solve(input: Readable) {
  const cardPile = new CardPile()

  let n = 0
  for await (const line of createInterface(input)) {
    if (!line) continue
    n++

    cardPile.incr(n)

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
    cardPile.incrRangeBy(n + 1, n + won, cardPile.numCopies(n))
  }

  return cardPile.countAll()
}
