import { createReadStream } from 'node:fs'
import { Readable } from 'node:stream'
import { getInputFile } from '../fetchInput.js'
import { solve as solve1 } from './1.js'
import { solve as solve2 } from './2.js'

let inputFile = ''

const example = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
  .split('\n')
  .map((line) => line + '\n')

beforeAll(async () => {
  inputFile = await getInputFile('3')
})

test('day 3 part 1', async () => {
  await expect(solve1(Readable.from(example))).resolves.toEqual(4361)

  await expect(
    solve1(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('532428')
})

test('day 3 part 2', async () => {
  await expect(solve2(Readable.from(example))).resolves.toEqual(467835)

  // await expect(
  //   solve2(createReadStream(inputFile)),
  // ).resolves.toMatchInlineSnapshot()
})
