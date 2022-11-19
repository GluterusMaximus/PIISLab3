import PriorityQueue from './PriorityQueue.js'

export default class Dijkstra {
  constructor(graph) {
    this.graph = graph
  }

  shortestPaths(index) {
    const distances = this.#initialDistances(index)
    const closed = new Map()

    while (!distances.isEmpty) {
      const {
        payload: currVertex,
        priority: currDistance,
      } = distances.shift()

      for (const {
        to: adjacentVertex,
        weight: adjacentWeight,
      } of currVertex.adjacent) {
        const priorityCompare = (
          newPriority,
          oldPriority
        ) => newPriority < oldPriority

        if (closed.has(adjacentVertex)) continue

        distances.update(
          adjacentVertex,
          currDistance + adjacentWeight,
          priorityCompare
        )
      }

      closed.set(currVertex, currDistance)
    }

    return closed
  }

  #initialDistances(index) {
    const distanceValues = Array(
      this.graph.vertices.length
    ).fill(Number.POSITIVE_INFINITY)

    const distances = new PriorityQueue(
      this.graph.vertices,
      distanceValues
    )

    distances.update(this.graph.get(index), 0)

    return distances
  }
}
