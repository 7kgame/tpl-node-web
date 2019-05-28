import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Min(min: number, message?: string) {
  return annotationHelper(arguments, callback)
}

const callback = function(annoType: AnnotationType, target: object, field: string, min:number, message?: string) {
  BeanFactory.addBeanMeta(annoType, target, field, Min, [min, message])
}

Min.validate = function (field: string, val: any, params: any[], val0: any, fieldType: string): {err: string, val: any} {
  let [min, message] = params
  let err = null
  if (val < min) {
    err = getMessage(field, val, params)
  }
  return {
    err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [min, message] = params
  if (!message) {
    message = 'the value of $field must be greater than $min'
  }
  return format(message, {field, min, val})
}