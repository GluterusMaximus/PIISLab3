import Graph from './Graph.js'

const compareArrays = (array1, array2) =>
  JSON.stringify(array1.sort()) ===
  JSON.stringify(array2.sort())

export default class UnorientedGraph extends Graph {
  constructor(edges) {
    const symmetrizedEdges =
      UnorientedGraph.#symmetrizeEdges(edges)
    super(symmetrizedEdges)
  }

  static #symmetrizeEdges(edges) {
    const minimalEdges = edges.filter(
      (edge) =>
        edges.find((otherEdge) => {
          const { to, from } = edge
          const { to: otherTo, from: otherFrom } = otherEdge
          return (
            compareArrays(
              [to, from],
              [otherTo, otherFrom]
            ) && otherEdge.weight < edge.weight
          )
        }) === undefined
    )

    return [
      ...minimalEdges,
      ...minimalEdges
        .map(({ to, from, weight }) => ({
          to: from,
          from: to,
          weight,
        }))
        .filter(
          (edge) =>
            minimalEdges.find(
              (otherEdge) =>
                edge.to === otherEdge.to &&
                edge.from === otherEdge.from
            ) === undefined
        ),
    ]
  }
}
