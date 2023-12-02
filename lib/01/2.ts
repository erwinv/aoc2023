import * as _ from 'lodash-es'
import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'

function firstDigit(line: string) {
  for (let i = 0; i < line.length; i++) {
    const char = line.charAt(i)

    if (char >= '0' && char <= '9') {
      return char
    }

    if (char === 'z') {
      if (line.substring(i, i + 4) === 'zero') {
        return '0'
      }
    } else if (char === 'o') {
      if (line.substring(i, i + 3) === 'one') {
        return '1'
      }
    } else if (char === 't') {
      if (line.substring(i, i + 3) === 'two') {
        return '2'
      } else if (line.substring(i, i + 5) === 'three') {
        return '3'
      }
    } else if (char === 'f') {
      if (line.substring(i, i + 4) === 'four') {
        return '4'
      } else if (line.substring(i, i + 4) === 'five') {
        return '5'
      }
    } else if (char === 's') {
      if (line.substring(i, i + 3) === 'six') {
        return '6'
      } else if (line.substring(i, i + 5) === 'seven') {
        return '7'
      }
    } else if (char === 'e') {
      if (line.substring(i, i + 5) === 'eight') {
        return '8'
      }
    } else if (char === 'n') {
      if (line.substring(i, i + 4) === 'nine') {
        return '9'
      }
    }
  }
}

function lastDigit(line: string) {
  for (let i = line.length - 1; i >= 0; i--) {
    const char = line.charAt(i)

    if (char >= '0' && char <= '9') {
      return char
    }

    if (char === 'e') {
      if (line.substring(i - 2, i + 1) === 'one') {
        return '1'
      } else if (line.substring(i - 4, i + 1) === 'three') {
        return '3'
      } else if (line.substring(i - 3, i + 1) === 'five') {
        return '5'
      } else if (line.substring(i - 3, i + 1) === 'nine') {
        return '9'
      }
    } else if (char === 'o') {
      if (line.substring(i - 3, i + 1) === 'zero') {
        return '0'
      } else if (line.substring(i - 2, i + 1) === 'two') {
        return '2'
      }
    } else if (char === 'r') {
      if (line.substring(i - 3, i + 1) === 'four') {
        return '4'
      }
    } else if (char === 'x') {
      if (line.substring(i - 2, i + 1) === 'six') {
        return '6'
      }
    } else if (char === 'n') {
      if (line.substring(i - 4, i + 1) === 'seven') {
        return '7'
      }
    } else if (char === 't') {
      if (line.substring(i - 4, i + 1) === 'eight') {
        return '8'
      }
    }
  }
}

export async function solve(input: Readable) {
  let sum = 0
  for await (const line of createInterface(input)) {
    if (!line) continue

    sum += _.toNumber(`${firstDigit(line)}${lastDigit(line)}`)
  }
  return sum
}
