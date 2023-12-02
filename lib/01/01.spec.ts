import { createReadStream } from 'node:fs'
import { getInputFile } from '../fetchInput.js'
import { solve as solve1 } from './1.js'
import { solve as solve2 } from './2.js'

let inputFile = ''

beforeAll(async () => {
  inputFile = await getInputFile('1')
})

test('day 1 part 1', async () => {
  await expect(
    solve1(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('54388')
})

test('day 1 part 2', async () => {
  await expect(
    solve2(createReadStream(inputFile)),
  ).resolves.toMatchInlineSnapshot('53515')
})
