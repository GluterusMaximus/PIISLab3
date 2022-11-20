import PriorityQueue from './PriorityQueue.js'

export default class Prim {
  constructor(graph) {
    this.graph = graph
  }

  mst() {
    const distances = this.#initialDistances()
    const visitedVertices = new Set()
    const mstEdges = new Set()

    while (!distances.isEmpty) {
      const {
        payload: currVertex,
        priority: currDistance,
      } = distances.shift()

      for (const {
        to: adjacentVertex,
        weight: adjacentWeight,
      } of currVertex.adjacent) {
        if (visitedVertices.has(adjacentVertex)) continue

        const distanceCompare = (
          newDistance,
          oldDistance
        ) => newDistance < oldDistance

        distances.update(
          adjacentVertex,
          adjacentWeight,
          distanceCompare
        )
      }

      visitedVertices.add(currVertex)
      const edgeStart = this.#findEdgeStart(
        currVertex,
        currDistance,
        [...visitedVertices]
      )

      if (edgeStart) {
        mstEdges.add({
          to: currVertex,
          weight: currDistance,
          from: edgeStart,
        })
      }
    }

    return mstEdges
  }

  #initialDistances() {
    const distanceValues = Array(
      this.graph.vertices.length
    ).fill(Number.POSITIVE_INFINITY)

    const distances = new PriorityQueue(
      this.graph.vertices,
      distanceValues
    )

    distances.update(this.graph.get(1), 0)

    return distances
  }

  #findEdgeStart(end, weight, vertices) {
    return vertices.find(
      (vertex) =>
        vertex.adjacent.find(
          (adjacent) =>
            adjacent.to === end &&
            adjacent.weight === weight
        ) !== undefined
    )
  }
}
