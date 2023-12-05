import { createReadStream } from 'node:fs'
import { getInputFile } from '../fetchInput.js'
import { fromText } from '../utils.js'
import { solve as solve1 } from './1.js'
import { solve as solve2 } from './2.js'

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

let inputFile = ''

beforeAll(async () => {
  inputFile = await getInputFile('2')
})

test('day 2 part 1', async () => {
  await expect(solve1(fromText(example))).resolves.toEqual(8)

  await expect(
    solve1(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('2505')
})

test('day 2 part 2', async () => {
  await expect(solve2(fromText(example))).resolves.toEqual(2286)

  await expect(
    solve2(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('70265')
})
