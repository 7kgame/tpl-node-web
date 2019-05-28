import { getObjectType } from 'jbean'

export function xmlEncode(ret: any): string {
  let xmlContent = []

  switch (getObjectType(ret)) {
    case 'map':
      ret.forEach((value , key) => {
        if (getObjectType(value) === 'object') {
          let res = xmlEncode(value)
          xmlContent.push('<' + key + '>' + res + '</' + key + '>')
        } else {
          xmlContent.push('<' + key + '>' + value + '</' + key + '>')
        }
      })
      break
    case 'object':
      let key: any
      for (key in ret) {
        if (getObjectType(ret[key]) === 'object') {
          let res = xmlEncode(ret[key])
          xmlContent.push('<' + key + '>' + res + '</' + key + '>')
        } else {
          xmlContent.push('<' + key + '>' + ret[key] + '</' + key + '>')
        }
      }
      break
    default:
      xmlContent = ret
  }

  return xmlContent.join('')
}

export function jsonEncode(ret: any): string {
  let type = getObjectType(ret)

  if (type === 'string') {
    return ret
  } else if (type === 'map') {
    let obj = Object.create(null)
    for (let [k, v] of ret) {
      obj[k] = v
    }
    ret = obj
  }

  return JSON.stringify(ret)
}