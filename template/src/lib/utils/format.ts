import { getObjectType } from 'jbean'
import * as util from 'util'

export function format (template: string, params: any, delimiter?: string): string {
  if (!params || !template) {
    return template
  }
  let type = getObjectType(params)
  if (type === 'object') {
    delimiter = delimiter || '$'
    Object.keys(params).forEach(key => {
      template = template.replace(new RegExp('\\' + delimiter + key, "g"), params[key])
    })
  } else if (type === 'array') {
    template = util.format(template, ...params)
  } else {
    template = util.format(template, params)
  }
  return template
}