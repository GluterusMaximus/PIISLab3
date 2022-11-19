export default class PriorityQueue {
  #queue = []

  constructor(payloads = [], priorities = []) {
    this.#queue = payloads
      .map((payload, i) => ({
        payload,
        priority: priorities[i],
      }))
      .sort((a, b) => a.priority - b.priority)
  }

  shift() {
    return this.#queue.shift()
  }

  push(payload, priority) {
    // @ts-ignore
    const lastSmaller = this.#queue.findLastIndex(
      (item) => item.priority < priority
    )

    if (lastSmaller === -1) {
      this.#queue.unshift({ payload, priority })
      return
    }

    this.#queue.splice(lastSmaller, 0, {
      payload,
      priority,
    })
  }

  update(
    payload,
    priority,
    condition = (newPriority, oldPriority) => true
  ) {
    const itemIndex = this.#queue.findIndex(
      (item) =>
        item.payload === payload &&
        condition(priority, item.priority)
    )

    if (itemIndex === -1) return

    this.#queue.splice(itemIndex, 1)
    this.push(payload, priority)
  }

  get isEmpty() {
    return this.#queue.length === 0
  }
}
