import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Size(min: number, max?: number | string, message?: string) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, target: object, field: string, min: number, max?: number | string, message?: string) {
  if (typeof max !== 'number') {
    message = max
    max = Number.MAX_VALUE
  }
  BeanFactory.addBeanMeta(annoType, target, field, Size, [min, max, message])
}

Size.validate = function (field: string, val: any, params: any[], val0: any, fieldType: string): { err: string, val: any } {
  let [min, max, message] = params
  let err = null
  val += ''
  let len = val.length
  if (len < min || len > max) {
    err = getMessage(field, val, params)
  }
  return {
    err: err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [min, max, message] = params
  if (!message) {
    if (max) {
      message =  'the length of $field must between $min and $max'
    } else {
      message = 'the length of $field must larger than $min'
    }
  }
  return format(message, {field, min, max, val})
}