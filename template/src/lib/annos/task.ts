import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'

export default function Task (target?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
}