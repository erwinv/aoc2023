import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'

export async function solve(input: Readable) {
  let sum = 0

  let prevLineSymbolsIdxs = new Set<number>()
  let prevLinePartNums = new Map<number, number>()

  for await (const line of createInterface(input)) {
    if (!line) continue

    const currLineSymbolsIdxs = new Set<number>()
    const currLineNums = new Map<number, string[]>()
    let currNum: string[] = []
    let isNumAdjacentToSymbol = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '.') {
        if (currNum.length > 0) {
          if (isNumAdjacentToSymbol) {
            const partNum = Number(currNum.join(''))
            sum += partNum
          }
          currNum = []
          isNumAdjacentToSymbol = false
        }
        continue
      }

      const isNum = char >= '0' && char <= '9'
      const isSymbol = !isNum

      if (isSymbol) {
        currLineSymbolsIdxs.add(i)

        if (currNum.length > 0) {
          if (isNumAdjacentToSymbol) {
            const partNum = Number(currNum.join(''))
            sum += partNum
          }
          currNum = []
          isNumAdjacentToSymbol = false
        }

        if (prevLinePartNums.has(i)) {
          const partNum = prevLinePartNums.get(i)!
          sum += partNum
        } else {
          const topLeft = prevLinePartNums.get(i - 1)
          const topRight = prevLinePartNums.get(i + 1)
          const left = Number(currLineNums.get(i - 1)?.join(''))

          if (topLeft) {
            sum += topLeft
          }
          if (topRight) {
            sum += topRight
          }
          if (left) {
            sum += left
          }
        }
      } else {
        currNum.push(char)
        currLineNums.set(i, currNum)

        if (
          !isNumAdjacentToSymbol &&
          (prevLineSymbolsIdxs.has(i) ||
            prevLineSymbolsIdxs.has(i - 1) ||
            prevLineSymbolsIdxs.has(i + 1) ||
            currLineSymbolsIdxs.has(i - 1))
        ) {
          isNumAdjacentToSymbol = true
        }
      }
    }

    prevLineSymbolsIdxs = currLineSymbolsIdxs
    prevLinePartNums = new Map(
      Array.from(currLineNums.entries()).map(([idx, num]) => [
        idx,
        Number(num.join('')),
      ]),
    )
  }

  return sum
}
