import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Regex(tester: string, message?: string) {
  if (!tester) {
    throw new Error('the tester (' + tester + ') of Regex is not valid')
  }
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, target: object, field: string, tester: string, message?: string) {
  BeanFactory.addBeanMeta(annoType, target, field, Regex, [tester, message])
}

Regex.validate = function (field: string, val: any, params: any[], val0: any, fieldType: string): { err: string, val: any } {
  let [tester, message] = params
  let err = null
  if (!val || typeof val !== 'string' || !val.match(new RegExp(tester))) {
    err = getMessage(field, val, params)
  }
  return {
    err: err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [tester, message] = params
  if (!message) {
    message = '$val is not valid'
  }
  return format(message, {val})
}