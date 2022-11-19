export default class CarpRabin {
  constructor(hashParam, symbolCount) {
    this.hashParam = hashParam
    this.symbolCount = symbolCount
  }

  #hash(string) {
    const chars = [...string]

    return chars.reduce(
      (sum, char) =>
        (sum * this.symbolCount + char.charCodeAt(0)) %
        this.hashParam,
      0
    )
  }

  #rehash(prevHash, string, highestPower, patternLength) {
    const biggestDigit = string.charCodeAt(0) * highestPower

    const lowestDigit = string.charCodeAt(patternLength)

    return (
      (this.symbolCount * (prevHash - biggestDigit) +
        lowestDigit) %
      this.hashParam
    )
  }

  #getHighestPower(pattern) {
    return (
      this.symbolCount ** (pattern.length - 1) %
      this.hashParam
    )
  }

  #getNextHash(
    currHash,
    textParams,
    highestPower,
    patternLength
  ) {
    const nextSlice =
      textParams.currSlice +
      (textParams.text[
        textParams.currIndex + patternLength
      ] ?? '')

    const nextHash = this.#rehash(
      currHash,
      nextSlice,
      highestPower,
      patternLength
    )

    return nextHash < 0
      ? nextHash + this.hashParam
      : nextHash
  }

  getMatches(text, pattern) {
    const matches = []
    const highestPower = this.#getHighestPower(pattern)

    const patternHash = this.#hash(pattern)

    let currSlice
    let textHash

    for (
      let i = 0;
      i <= text.length - pattern.length;
      i++
    ) {
      currSlice = text.slice(i, i + pattern.length)
      textHash ??= this.#hash(currSlice)

      if (patternHash === textHash) {
        if (currSlice === pattern) matches.push(i)
      }

      textHash = this.#getNextHash(
        textHash,
        { text, currIndex: i, currSlice },
        highestPower,
        pattern.length
      )
    }

    return matches
  }
}
