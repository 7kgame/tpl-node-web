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

Auth.preCall = function (ignore: boolean, req: Request, res: Response) {
  if (ignore) {
    console.log('todo return need login data')
    // return null while stop the call chain
    return null
  }
}

Auth.postCall = function (ret: any, req: Request, res: Response) {
  return ret
}