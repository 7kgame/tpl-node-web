import { DoubleLinkedQueue, DoubleLinkedNode } from "../utils/linked_queue"

class Entry {

  public node: DoubleLinkedNode
  public value: Buffer
  public length: number
  public now: number
  public maxAge: number

  constructor(node: DoubleLinkedNode, value: Buffer, length: number, now: number, maxAge: number) {
    this.node = node
    this.value = value
    this.length = length
    this.now = now
    this.maxAge = maxAge
  }
}

export default class LRUCache {

  private cacheQueue = new DoubleLinkedQueue()
  private cacheMap = {}
  private MAX_CACHE_SIZE = 1024 * 1024 * 300
  private tempCacheSize = 0
  private static ins: LRUCache = null
  private EXPIRE_TIME: number

  private constructor(options) {
    this.MAX_CACHE_SIZE = options.max_cache_size || 1024 * 1024 * 300
    this.EXPIRE_TIME = options.expire || 1000 * 60
  }

  public static create(options: object): LRUCache {
    if (!LRUCache.ins) {
      LRUCache.ins = new LRUCache(options)
      return LRUCache.ins
    }
    return LRUCache.ins
  }

  public static getIns(): LRUCache {
    return LRUCache.ins
  }

  public set(key: string, val: string, expire?: number) {
    // console.log('insert %s => %s', key, val)
    let expire_time = expire || this.EXPIRE_TIME
    let buffer = Buffer.from(val)
    this.tempCacheSize += buffer.length
    if (this.tempCacheSize >= this.MAX_CACHE_SIZE) {
      this.del()
      while (this.tempCacheSize >= this.MAX_CACHE_SIZE) {
        this.del()
      }
    }
    let node = this.cacheQueue.push(key)
    let entry = new Entry(node, buffer, buffer.length, Date.now(), expire_time)
    this.cacheMap[key] = entry
  }

  /**
   * release the least recently used cache entry
   */
  public del(): boolean {
    let key: string = this.cacheQueue.pop().val
    // console.log('del', key)
    let cacheEntry: Entry = this.cacheMap[key]
    if (!cacheEntry) {
      return false
    }
    this.tempCacheSize -= cacheEntry.length
    delete this.cacheMap[key]
    return true
  }

  public get(key: string): string {
    if (this.isStale(key)) {
      this.releaseBeforeKey(key)
      return ''
    } else {
      let entry: Entry = this.cacheMap[key]
      // move the entry to the tail of the queue, which means the latest
      if (entry.node !== this.cacheQueue.tail()) {
        this.cacheQueue.erase(entry.node)
        entry.node = this.cacheQueue.push(key)
      }
      return entry.value.toString()
    }
  }

  public reset() {
    while (!this.cacheQueue.empty()) {
      this.del()
    }
  }

  private isStale(key: string): boolean {
    let cacheEntry: Entry = this.cacheMap[key]
    if (!cacheEntry) {
      return true
    }
    let diff = Date.now() - cacheEntry.now
    if (diff > cacheEntry.maxAge) {
      return true
    }
    return false
  }

  private releaseBeforeKey(key: string) {
    if (!this.cacheMap[key]) {
      return
    }
    while (this.cacheQueue.head().val !== key) {
      let k: string = this.cacheQueue.pop().val
      this.tempCacheSize -= this.cacheMap[k].length
      delete this.cacheMap[k]
    }
    let k: string = this.cacheQueue.pop().val
    this.tempCacheSize -= this.cacheMap[k].length
    delete this.cacheMap[k]
  }
}

