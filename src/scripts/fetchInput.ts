import 'dotenv/config'
import { strict as assert } from 'node:assert'
import { get as httpsGet } from 'node:https'
import { getToday } from '../today.js'

const sessionCookie = process.env.ADVENT_OF_CODE_SESSION_COOKIE
assert(sessionCookie, 'Missing session cookie')

const [, , dateOverride] = process.argv
const today = getToday(dateOverride)

const D = today.format('D')

httpsGet(
  `https://adventofcode.com/2023/day/${D}/input`,
  {
    headers: {
      cookie: `session=${sessionCookie}`,
    },
  },
  (res) => {
    try {
      assert.equal(res.statusCode, 200, 'Error in HTTP response')
    } catch (err) {
      res.pipe(process.stderr)
      throw err
    }
    res.pipe(process.stdout)
  },
).on('error', console.error)
