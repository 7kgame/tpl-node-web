import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Required(message?: Function | string | any, options?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function(annoType: AnnotationType, target: object, field: string, message?: string) {
  BeanFactory.addBeanMeta(annoType, target, field, Required, [message])
}

Required.validate = function (field: string, val: any, params: any[], val0: any, fieldType: string): {err: string, val: any} {
  let err = null
  if (val === null || val === undefined || val === '') {
    err = getMessage(field, val, params)
  }
  return {
    err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [message] = params
  if (!message) {
    message = 'key $field is required'
  }
  return format(message, {field, val})
}