import 'zx/globals'
import { getToday } from '../today.js'

const [, , part = '1', dateOverride] = process.argv
const today = getToday(dateOverride)

const DD = today.format('DD')

await $`cat ./inputs/${DD}.txt | node ./build/${DD}/${part}.js`
