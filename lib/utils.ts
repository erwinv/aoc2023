import * as _ from 'lodash-es'
import { Readable } from 'node:stream'

export function* split(
  line: string,
  separator: string,
  includeSeparator = false,
) {
  let start = 0
  let end = line.indexOf(separator)

  while (end > -1) {
    if (includeSeparator) {
      yield line.substring(start, end) + separator
    } else {
      yield line.substring(start, end)
    }
    start = end + separator.length
    end = line.indexOf(separator, start)
  }

  if (includeSeparator) {
    yield line.substring(start) + separator
  } else {
    yield line.substring(start)
  }
}

export function* splitBy(line: string, separatorFn: (c: string) => boolean) {
  const isNotSeparator = _.negate(separatorFn)

  let start = _.findIndex(line, isNotSeparator)
  let end = _.findIndex(line, separatorFn, start)

  while (end > -1) {
    yield line.substring(start, end)
    start = _.findIndex(line, isNotSeparator, end)
    end = _.findIndex(line, separatorFn, start)
  }

  if (start > -1) {
    yield line.substring(start)
  }
}

export function fromText(text: string, separator = '\n') {
  return Readable.from(split(text, separator, true))
}

export function* skip<T>(n = 1, it: IterableIterator<T>) {
  while (n-- > 0) {
    it.next()
  }
  yield* it
}

export function unshift<T>(it: IterableIterator<T>) {
  const { done, value } = it.next()
  if (!done) return value
}
