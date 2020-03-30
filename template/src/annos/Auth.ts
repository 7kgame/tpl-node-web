import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { Request, Response } from 'jweb'

export default function Auth (component?: any, options?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
  if (annoType === AnnotationType.clz) {
    BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, Auth, [arguments[2]])
  } else if (annoType === AnnotationType.method) {
    BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], Auth, [arguments[4]])
  }
}

Auth.preCall = function authPreCall(ret: any, param: string, req: Request, res: Response) {
  if (param === 'ignore') {
    return {
      err: "ignore",
      data: null
    }
  }
  console.log('Auth preCall', ret)
  return ret
}

Auth.postCall = function authPostCall(ret: any) {
  console.log('Auth postCall', ret)
  return ret
}
