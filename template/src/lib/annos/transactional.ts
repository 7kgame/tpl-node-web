import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'

export default function Transactional (component?: any, type?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
  if (annoType === AnnotationType.clz) {
    // BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, Transactional, [arguments[2]])
  } else if (annoType === AnnotationType.method) {
    // BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], Transactional, [arguments[4]])
  }
}