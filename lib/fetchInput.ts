import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { createWriteStream } from 'node:fs'
import { access, constants } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const sessionCookie = process.env.ADVENT_OF_CODE_SESSION_COOKIE
assert(sessionCookie, 'Missing session cookie')

const DAYS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
] as const

type D = `${(typeof DAYS)[number]}`

export async function fetchInput(day: D) {
  const response = await fetch(
    `https://adventofcode.com/2023/day/${day}/input`,
    {
      headers: {
        cookie: `session=${sessionCookie}`,
      },
    },
  )

  if (!response.ok || !response.body) {
    throw response
  }

  return Readable.fromWeb(response.body)
}

export async function getInputFile(day: D) {
  const file = `inputs/${day}.txt`

  const inputFileExists = await access(file, constants.R_OK).then(
    () => true,
    () => false,
  )

  if (!inputFileExists) {
    const response = await fetchInput(day)
    await pipeline(response, createWriteStream(file))
  }

  return `inputs/${day}.txt`
}
