import { readFileSync } from 'fs'
import CarpRabin from './CarpRabin.js'

const VARIANT = 24
const SYMBOL_COUNT = 256

const inputText = readFileSync(
  'input.txt',
  'utf8'
).toString()
const searchPattern = 'volutpat'

const carpRabin = new CarpRabin(VARIANT, SYMBOL_COUNT)

console.log(carpRabin.getMatches('GEEKS FOR GEEKS', 'GEEK'))
console.log(carpRabin.getMatches(inputText, searchPattern))
