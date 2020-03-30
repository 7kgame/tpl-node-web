import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { Request, Response, jsonEncode, xmlEncode } from 'jweb'

export default function ResponseBody (type: string) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
  if (annoType === AnnotationType.clz) {
    BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, ResponseBody, [arguments[2]])
  } else if (annoType === AnnotationType.method) {
    BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], ResponseBody, [arguments[4]])
  }
}

ResponseBody.preCall = function rbdPreCall(ret: any, type: string, req: Request, res: Response) {
  switch (type) {
    case 'json':
      res.type('application/json')
      break
    case 'xml':
      res.type('application/xml')
      break
    default:
      break
  }
  return ret
}

ResponseBody.postCall = function rbdPostCall(ret: any, type: string, req: Request, res: Response) {
  switch (type) {
    case 'json':
      if (typeof ret.data === 'object') {
        ret.data = jsonEncode(ret.data)
      }
      break
    case 'xml':
      ret.data = xmlEncode(ret.data)
      break
    default:
      break
  }
  return ret
}
