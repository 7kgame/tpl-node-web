import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID } from 'jbean'
import LRUCache from '../cache/LRUCache'
import Application from '../application'
import { Request, Response } from '../base'

export default function Cache(expire?: number) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object, field: string, descriptor: PropertyDescriptor, expire?:number) {
  BeanFactory.addBeanMeta(annoType, ctor, field, Cache, [expire], null, retHook)
}

BeanFactory.registerStartBean(() => {
  let application = Application.getIns()
  const configNS: string = application.configNS
  const applicationConfigs = application.applicationConfigs
  if ( !applicationConfigs ||
      !applicationConfigs[configNS] ||
      !applicationConfigs[configNS].cache ) {
        LRUCache.create({})
    return
  }

  const cacheConfigs = applicationConfigs[configNS].cache
  let max_cache_size = cacheConfigs.maxCacheSize || undefined
  let expire = cacheConfigs.expire || undefined
  if (max_cache_size) {
    max_cache_size = Number.parseInt(max_cache_size, 10)
  }
  if (expire) {
    expire = Number.parseInt(expire, 10)
  }
  LRUCache.create({
    max_cache_size,
    expire
  })
})

// function setCache(url: string, val: string, expire?: number) {
//   LRUCache.getIns().set(url, val, expire)
// }

// function getCache(url: string):string {
//   return LRUCache.getIns().get(url)
// }

function retHook(ret: any, expire: number, request: Request, response: Response): void {
  if (ret.err) {
    return
  }
  let lruCache = LRUCache.getIns()
  lruCache.set(request.url.href, ret.data, expire)
}

Cache.preCall = function (ret: any, expire: number, request: Request, response: Response) {
  if (ret.err) {
    return ret
  }

  let cache = LRUCache.getIns().get(request.url.href)
  if (cache) {
    response.writeAndFlush(cache)
    return null
  }
}