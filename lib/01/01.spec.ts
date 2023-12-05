import { createReadStream } from 'node:fs'
import { getInputFile } from '../fetchInput.js'
import { fromText } from '../utils.js'
import { solve as solve1 } from './1.js'
import { solve as solve2 } from './2.js'

let inputFile = ''

beforeAll(async () => {
  inputFile = await getInputFile('1')
})

test('day 1 part 1', async () => {
  const example = `1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`

  await expect(solve1(fromText(example))).resolves.toEqual(142)

  await expect(
    solve1(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('54388')
})

test('day 1 part 2', async () => {
  const example = `two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteen`

  await expect(solve2(fromText(example))).resolves.toEqual(281)

  await expect(
    solve2(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('53515')
})
