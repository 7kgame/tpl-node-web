const QUEUE_START = Symbol.for('QUEUE_START')

export class DoubleLinkedNode {
  public val: any
  public next: DoubleLinkedNode
  public pre: DoubleLinkedNode

  constructor(val: any, pre: DoubleLinkedNode = null, next: DoubleLinkedNode = null) {
    this.val = val
    this.next = next
    this.pre = pre
  }
}

export class DoubleLinkedQueue {
  // aim to reduce judgement when push and pop
  private $head: DoubleLinkedNode = new DoubleLinkedNode(QUEUE_START, null)
  private $tail: DoubleLinkedNode = this.$head
  private $length: number = 0

  // push a node to the tail
  public push(n: any):DoubleLinkedNode {
    let node = new DoubleLinkedNode(n, this.$tail)
    this.$tail.next = node
    this.$tail = node
    this.$length++
    return node
  }

  // pop a node from the head
  public pop(): DoubleLinkedNode {
    let temp = this.$head.next
    this.$head.next = temp.next
    this.$length--
    if (temp === this.$tail) {
      this.$tail = this.$head
    } else {
      temp.next.pre = this.$head
    }
    return temp
  }

  public head() {
    return this.$head.next
  }

  public tail() {
    return this.$tail
  }

  public length(): number {
    return this.$length
  }

  public erase(node: DoubleLinkedNode) {
    let preNode = node.pre
    preNode.next = node.next
    node.next.pre = preNode
    this.$length--
  }

  public empty(): boolean {
    return (this.$tail.val === Symbol.for('QUEUE_START'))
  }

  public forEach(fn: Function) {
    let temp = this.$head.next
    while (temp !== null) {
      fn(temp.val)
      temp = temp.next
    }
  }
}