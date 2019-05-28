import * as Hapi from 'hapi'
import * as Boom from 'boom'

import ReqRes from './reqres'

export default class Response extends ReqRes {

  public static primaryTypes = ['boolean', 'number', 'string']

  private request: Hapi.Request
  private response: Hapi.ResponseToolkit
  // constructor (request: Hapi.Request, response: Hapi.ResponseToolkit, resolve: any, reject: any) {
  constructor (request: Hapi.Request, response: Hapi.ResponseToolkit) {
    super()
    this.request = request
    this.response = response
  }

  public write (data: any): void {
    if (data === null || data === undefined) {
      return
    }
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
    }
    this.request.raw.res.write(data)
  }

  public flush (): void {
    this.request.raw.res.end()
  }

  public writeAndFlush (data?: any): void {
    this.write(data)
    this.flush()
  }

  public redirect (url: string, code?: number): void {
    if (code === undefined) {
      code = 302
    }
    this.request.raw.res.writeHead(code, {
      Location: url
    })
    this.flush()
  }

  public writeHeader (code: number, reason?: string) {
    this.request.raw.res.writeHead(code, reason)
  }

  public setHeader (name: string, value: any): void {
    this.request.raw.res.setHeader(name, value)
  }

  public type (mimeType: string): void {
    this.setHeader('Content-Type', mimeType)
  }

  public setCookie (name: string, value: object | string, options?: any): void {
    this.response.response().state(name, value, options)
  }

  public delCookie (name: string, options?: any): void {
    this.response.response().unstate(name, options)
  }

  public error(message?: string): void {
    this.writeHeader(500, message)
    this.flush()
  }

}
