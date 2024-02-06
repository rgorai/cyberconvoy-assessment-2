const VALID_PAIRS: Record<string, string> = {
  P: 'A',
  N: 'Y',
  O: 'H',
  W: 'V',
}

export const validateSequence = (sequence: string) => {
  if (typeof sequence !== 'string' || sequence.length % 2 !== 0)
    throw 'Sequence must be a string of even length.'

  for (let i = 0, j = sequence.length - 1; i < sequence.length / 2; i++, j--) {
    const match = VALID_PAIRS[sequence[i].toUpperCase()]

    if (!match) throw `Invalid character '${sequence[i]}' at position ${i}.`

    if (sequence[j].toUpperCase() !== match)
      throw `No matching pair for character '${sequence[i]}' at position ${i}.`
  }
}
