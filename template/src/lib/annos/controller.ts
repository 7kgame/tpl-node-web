import * as Path from 'path'
import * as Hapi from 'hapi'
import { AnnotationType, annotationHelper, BeanFactory, BeanMeta, CTOR_ID, CTOR_JWEB_FILE_KEY, getObjectType, ReflectHelper } from 'jbean'

import Application, { AppErrorEvent, ApplicationType } from '../application'
import { Request, Response } from '../base'

export function Controller(path: string) {
  return annotationHelper(arguments, controllerCallback)
}

export function Get(path: string) {
  return annotationHelper(['GET', path], methodCallback)
}

export function Post(path: string) {
  return annotationHelper(['POST', path], methodCallback)
}

export function Put(path: string) {
  return annotationHelper(['PUT', path], methodCallback)
}

export function Patch(path: string) {
  return annotationHelper(['PATCH', path], methodCallback)
}

export function Options(path: string) {
  return annotationHelper(['OPTIONS', path], methodCallback)
}

const controllerCallback = function (annoType: AnnotationType, ctor: Function, path?: string) {
  controllers.push(ctor)
  addAnno(ctor, path)
}

const methodCallback = function (annoType: AnnotationType, target: object, method: string, descriptor: PropertyDescriptor, requestMethod: string, path?: string) {
  addAnno(target, path, method, requestMethod, true)
}

const URL_PATH_TRIM = /^\/*|\/*$/g
const URL_END_PATH_TRIM = /\/*$/g

const controllerMetas = {}
const controllers: Function[] = []

const addAnno = function (target: object | Function, path: string, method?: string, requestMethod?: string, requestMapping?: boolean) {
  let ctor = target
  if (typeof target === 'object') {
    ctor = target.constructor
  }
  let ctorId = ctor[CTOR_ID]
  if (typeof controllerMetas[ctorId] === 'undefined') {
    controllerMetas[ctorId] = {
      ctor: ctor,
      methods: [],
      path: ''
    }
  }
  let metas = controllerMetas[ctorId]
  if (!method) {
    metas.path = '/' + (path || '').replace(URL_PATH_TRIM, '')
    metas.path = (metas.path === '/') ? metas.path : (metas.path + '/')
  } else {
    metas.methods.push({
      target: target,
      method: method,
      requestMethod: requestMethod,
      subPath: (path || '').replace(URL_PATH_TRIM, ''),
      requestMapping: requestMapping
    })
  }
}

BeanFactory.registerInitBean(() => {
  controllers.forEach((controller: Function) => {
    ReflectHelper.resetClass(controller)
  })
})

const controllerIns = {}
const TEMPLATE_DIR_NAME: string = 'template'
const LAYOUT_DIR_NAME: string = 'layout'
export const TPL_DIR_KEY: string = '__tplDir'
export const LAYOUT_DIR_KEY: string = '__layoutDir'
export const EXT_KEY: string = '__tplExt'
export const METHOD_KEY: string = '__method'

const addTemplateDir = function (ctor: Function, ins: object | Function) {
  if (typeof ctor[METHOD_KEY] === 'undefined') {
    const application: Application = Application.getIns()
    let controllerPath = ctor[CTOR_JWEB_FILE_KEY].split(application.controllerDir)
    let viewDir = application.viewDir
    if (!Path.isAbsolute(viewDir)) {
      viewDir = Path.join(application.root, viewDir)
    }

    ctor[TPL_DIR_KEY] = viewDir + Path.sep
      + TEMPLATE_DIR_NAME + Path.sep
      + controllerPath.pop().replace(URL_PATH_TRIM, '').slice(0, -3).toLowerCase() + Path.sep
    ctor[LAYOUT_DIR_KEY] = viewDir + Path.sep + LAYOUT_DIR_NAME + Path.sep
    ctor[EXT_KEY] = application.tplExt
  }
  if (typeof ins === 'object' && typeof ins[TPL_DIR_KEY] === 'undefined') {
    ins[TPL_DIR_KEY] = ctor[TPL_DIR_KEY]
    ins[LAYOUT_DIR_KEY] = ctor[LAYOUT_DIR_KEY]
    ins[EXT_KEY] = ctor[EXT_KEY]
  }
}

BeanFactory.registerStartBean(() => {
  const app = Application.getIns()
  if (app.applicationType !== ApplicationType.web) {
    return
  }
  Object.values(controllerMetas).forEach(({ ctor, methods, path }) => {
    methods.forEach(({ target, method, requestMethod, subPath, requestMapping }) => {
      if (!requestMapping) {
        return
      }
      const app = Application.getIns()
      const supportCors = app.getAppConfigs().cors
      const routePath = (path + subPath).replace(URL_END_PATH_TRIM, '') || '/'
      app.route({
        method: requestMethod,
        path: routePath,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
          return new Promise((resolve, reject) => {
            const req = new Request(request, h)
            const res = new Response(request, h)
            if (supportCors) {
              res.setHeader('Access-Control-Allow-Credentials', true)
              res.setHeader('Access-Control-Allow-Origin', request.headers.origin || '*')
              res.setHeader('Access-Control-Allow-Headers', '*, X-Requested-With, Content-Type')
              res.setHeader('Access-Control-Allow-Methods', request.method)
              res.setHeader('Access-Control-Max-Age', 86400)
              res.setHeader('Access-Control-Expose-Headers', 'WWW-Authenticate,Server-Authorization')
            }
            let ins = target
            if (typeof target !== 'function') {
              if (typeof controllerIns[ctor[CTOR_ID]] === 'undefined') {
                controllerIns[ctor[CTOR_ID]] = new ctor()
              }
              ins = controllerIns[ctor[CTOR_ID]]
              addTemplateDir(ctor, ins)
            }
            ins[METHOD_KEY] = method.toLowerCase()
            let params: any[] = [req, res]
            if (request.params && Object.keys(request.params).length > 0) {
              params.push(request.params)
            }
            try {
              res.type('text/html')
              const ret = ins[method](...params)
              if (ret === null) {
                /** done nothing, cause res is solved by annotation which returns null*/
                res.flush()
              } else if (getObjectType(ret) === 'promise') {
                ret.then(data => {
                  res.writeAndFlush(data)
                  // resolve()
                }).catch(e => {
                  app.emit(AppErrorEvent.REQUEST, e)
                  res.error('Internal Server Error')
                })
              } else {
                res.writeAndFlush(ret)
                // resolve()
              }
            } catch (e) {
              app.emit(AppErrorEvent.REQUEST, e)
              res.error('Internal Server Error')
            }
          })
        }
      })
    })
  })
})