import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'

function getGameMinimumSetPower(cubeSets: string) {
  let minRed = 0
  let minGreen = 0
  let minBlue = 0

  for (const cubeSet of cubeSets.split('; ')) {
    for (const cubes of cubeSet.split(', ')) {
      const n = parseInt(cubes)
      if (cubes.endsWith(' red') && n > minRed) {
        minRed = n
      } else if (cubes.endsWith(' green') && n > minGreen) {
        minGreen = n
      } else if (cubes.endsWith(' blue') && n > minBlue) {
        minBlue = n
      }
    }
  }

  return minRed * minGreen * minBlue
}

export async function solve(input: Readable) {
  let sum = 0

  for await (const line of createInterface(input)) {
    if (!line) continue

    const [, cubeSets] = line.split(': ')

    sum += getGameMinimumSetPower(cubeSets)
  }

  return sum
}
