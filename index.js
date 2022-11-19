import { readFileSync } from 'fs'
import CarpRabin from './CarpRabin.js'

const VARIANT = 24
const SYMBOL_COUNT = 256

const inputText = readFileSync(
  'input.txt',
  'utf8'
).toString()
const searchPattern = 'volutpat'

const getHash = (string, symbolCount, hashParam) =>
  [...string].reduce(
    (sum, char) =>
      (sum * symbolCount + char.charCodeAt(0)) % hashParam,
    0
  )

const rehash = (prevHash, string, index, hashProps) =>
  (hashProps.d *
    (prevHash - string[index].charCodeAt(0) * hashProps.h) +
    string[index + hashProps.m].charCodeAt(0)) %
  hashProps.q

// const carpRabin = (
//   text,
//   pattern,
//   hashParam,
//   symbolCount
// ) => {
//   const patternLength = pattern.length
//   const textLength = text.length

//   const highestPower =
//     symbolCount ** (patternLength - 1) % hashParam

//   const patternHash = getHash(
//     pattern,
//     symbolCount,
//     hashParam
//   )
//   let textHash = getHash(
//     text.slice(0, patternLength),
//     symbolCount,
//     hashParam
//   )

//   const matches = []
//   for (let i = 0; i <= textLength - patternLength; i++) {
//     const textSlice = text.slice(i, i + patternLength)
//     // console.dir({ textSlice, patternHash, textHash })

//     if (patternHash === textHash) {
//       if (textSlice === pattern) matches.push(i)
//     }

//     if (i < textLength - patternLength) {
//       textHash = rehash(textHash, text, i, {
//         d: symbolCount,
//         q: hashParam,
//         h: highestPower,
//         m: patternLength,
//       })

//       if (textHash < 0) textHash += hashParam
//     }
//   }

//   return matches
// }

const getNextMatch = (string, pattern, matches) =>
  string.indexOf(pattern, matches.at(-1) + 1)

const getMatches = (string, pattern) => {
  const matches = []
  while (getNextMatch(string, pattern, matches) !== -1) {
    matches.push(getNextMatch(string, pattern, matches))
  }
  return matches
}

const carpRabin = new CarpRabin(VARIANT, SYMBOL_COUNT)

console.log(carpRabin.getMatches('GEEKS FOR GEEKS', 'GEEK'))
console.log(getMatches('GEEKS FOR GEEKS', 'GEEK'))

console.log(carpRabin.getMatches(inputText, searchPattern))
console.log(getMatches(inputText, searchPattern))
