class Vertex {
  adjacent = []

  constructor(index) {
    this.index = index
  }
}

export default class Graph {
  constructor(edges) {
    const indices = new Set([
      ...edges.map((e) => e.to),
      ...edges.map((e) => e.from),
    ])

    this.vertices = [...indices].map((i) => new Vertex(i))

    this.#fillAdjacent(edges)
  }

  get(index) {
    return this.vertices.find(
      (vertex) => vertex.index === index
    )
  }

  #fillAdjacent(edges) {
    for (const edge of edges) {
      this.get(edge.from)?.adjacent.push({
        to: this.get(edge.to),
        weight: edge.weight,
      })
    }
  }
}
