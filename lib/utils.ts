export function* split(line: string, separator: string) {
  let start = 0
  let end = line.indexOf(separator)

  while (end !== -1) {
    yield line.substring(start, end)
    start = end + separator.length
    end = line.indexOf(separator, start)
  }

  yield line.substring(start)
}
