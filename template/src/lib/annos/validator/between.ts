import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Between(min: number, max: number, message?: string) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, target: object, field: string, min: number, max: number, message?: string) {
  BeanFactory.addBeanMeta(annoType, target, field, Between, [min, max, message])
}

Between.validate = function (field: string, val: any, params: any[], val0: any, fieldType: string): { err: string, val: any } {
  let [min, max, message] = params
  let err = null
  if (val < min || val > max) {
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
    message = 'the value of $field must between $min and $max'
  }
  return format(message, {field, min, max, val})
}