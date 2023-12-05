import { createReadStream } from 'node:fs'
import { getInputFile } from '../fetchInput.js'
import { fromText } from '../utils.js'
import { solve as solve1 } from './1.js'
import { solve as solve2 } from './2.js'

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

let inputFile = ''

beforeAll(async () => {
  inputFile = await getInputFile('4')
})

test('day 4 part 1', async () => {
  await expect(solve1(fromText(example))).resolves.toEqual(13)

  await expect(
    solve1(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('22897')
})

test('day 4 part 2', async () => {
  await expect(solve2(fromText(example))).resolves.toEqual(30)

  await expect(
    solve2(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('5095824')
})
