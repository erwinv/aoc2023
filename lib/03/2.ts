import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'

export async function solve(input: Readable) {
  let sum = 0

  let prevLineStarsIdxs = new Set<number>()
  let prevLineGearNums = new Map<number, number>()

  for await (const line of createInterface(input)) {
    if (!line) continue

    const currLineStarsIdxs = new Set<number>()
    const currLineNums = new Map<number, string[]>()
    let currNum: string[] = []
    let isNumAdjacentToStar = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      const isNum = char >= '0' && char <= '9'
      const isStar = char === '*'

      if (isStar) {
        currLineStarsIdxs.add(i)

        const partNums: number[] = []

        if (prevLineGearNums.has(i)) {
          const gearNum = prevLineGearNums.get(i)!
          partNums.push(gearNum)
        } else {
          const topLeft = prevLineGearNums.get(i - 1)
          const topRight = prevLineGearNums.get(i + 1)
          const left = Number(currLineNums.get(i - 1)?.join(''))

          if (topLeft) {
            partNums.push(topLeft)
          }
          if (topRight) {
            partNums.push(topRight)
          }
          if (left) {
            partNums.push(left)
          }
        }

        if (partNums.length === 2) {
          sum += partNums[0] * partNums[1]
        }
      } else if (isNum) {
        currNum.push(char)
        currLineNums.set(i, currNum)

        if (
          !isNumAdjacentToStar &&
          (prevLineStarsIdxs.has(i) ||
            prevLineStarsIdxs.has(i - 1) ||
            prevLineStarsIdxs.has(i + 1) ||
            currLineStarsIdxs.has(i - 1))
        ) {
          isNumAdjacentToStar = true
        }
      }

      if (!isNum && currNum.length > 0) {
        if (isNumAdjacentToStar) {
          const gearNum = Number(currNum.join(''))
          sum += gearNum
        }
        currNum = []
        isNumAdjacentToStar = false
      }
    }

    prevLineStarsIdxs = currLineStarsIdxs
    prevLineGearNums = new Map(
      Array.from(currLineNums.entries()).map(([idx, num]) => [
        idx,
        Number(num.join('')),
      ]),
    )
  }

  return sum
}
