import { readFileSync } from 'fs'
import CarpRabin from './CarpRabin.js'
import Dijkstra from './Dijkstra.js'
import Graph from './Graph.js'

const VARIANT = 24
const SYMBOL_COUNT = 256

const inputText = readFileSync(
  'input.txt',
  'utf8'
).toString()
const searchPattern = 'volutpat'

const carpRabin = new CarpRabin(VARIANT, SYMBOL_COUNT)

console.log(
  `Search pattern (Carp Rabin algorithm): ${searchPattern}`
)
console.log('The pattern occurred in the text at indices:')
console.log(carpRabin.getMatches(inputText, searchPattern))
console.log('-'.repeat(50))

const dijkstraEdges = [
  { from: 2, to: 7, weight: 3 },
  { from: 2, to: 4, weight: 1 },
  { from: 3, to: 1, weight: 3 },
  { from: 3, to: 6, weight: 2 },
  { from: 3, to: 5, weight: 2 },
  { from: 4, to: 2, weight: 3 },
  { from: 4, to: 7, weight: 3 },
  { from: 5, to: 6, weight: 5 },
  { from: 5, to: 7, weight: 2 },
  { from: 5, to: 8, weight: 5 },
  { from: 6, to: 2, weight: 1 },
  { from: 6, to: 1, weight: 3 },
  { from: 6, to: 5, weight: 2 },
  { from: 6, to: 7, weight: 1 },
  { from: 6, to: 8, weight: 3 },
  { from: 7, to: 6, weight: 1 },
  { from: 7, to: 8, weight: 2 },
  { from: 8, to: 2, weight: 2 },
  { from: 8, to: 4, weight: 2 },
  { from: 8, to: 7, weight: 4 },
]

const displayPaths = (map, source) => {
  const sortedPaths = [...map.entries()].sort(
    ([vertex1], [vertex2]) => vertex1.index - vertex2.index
  )

  for (const [vertex, distance] of sortedPaths) {
    console.log(
      `${source.index} to ${vertex.index}: ${distance}`
    )
  }
}

const sourceIndex = 3
const dijkstraGraph = new Graph(dijkstraEdges)
const dijkstra = new Dijkstra(dijkstraGraph)
const shortestPaths = dijkstra.shortestPaths(sourceIndex)

console.log('Dijkstra algorithm')
displayPaths(shortestPaths, dijkstraGraph.get(sourceIndex))
console.log('-'.repeat(50))
