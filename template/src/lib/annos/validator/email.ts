import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

export default function Email(message?: string | any, options?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, target: object, field: string, message?: string) {
  BeanFactory.addBeanMeta(annoType, target, field, Email, [message])
}

Email.validate = function (field: string, val: any, params: any[], val0: any, fieldType: string): { err: string, val: any } {
  let [message] = params
  let err = null
  if (!val || typeof val !== 'string' || val.length > 254 || !tester.test(val)) {
    err = getMessage(field, val, params)
  }
  return {
    err: err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [message] = params
  if (!message) {
    message = '$val is not a valid email'
  }
  return format(message, {val})
}