import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'
import { split } from '../utils.js'

function isGamePossible(cubeSets: string) {
  for (const cubeSet of split(cubeSets, '; ')) {
    for (const cubes of split(cubeSet, ', ')) {
      const n = parseInt(cubes)
      if (cubes.endsWith(' red') && n > 12) return false
      else if (cubes.endsWith(' green') && n > 13) return false
      else if (cubes.endsWith(' blue') && n > 14) return false
    }
  }

  return true
}

export async function solve(input: Readable) {
  let sum = 0

  for await (const line of createInterface(input)) {
    if (!line) continue

    const [game, cubeSets] = line.split(': ')

    if (isGamePossible(cubeSets)) {
      sum += parseInt(game.substring(5))
    }
  }

  return sum
}
