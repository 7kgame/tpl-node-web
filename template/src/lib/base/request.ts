import * as Hapi from 'hapi'

import ReqRes from './reqres'

export default class Request extends ReqRes {

  public url
  public path
  public payload
  public query
  public params
  public paramsArray
  public headers
  public cookies
  public entity: any
  public innerParams: {}

  private request: Hapi.Request
  private response: Hapi.ResponseToolkit

  // constructor (request: Hapi.Request, response: Hapi.ResponseToolkit, resolve: any, reject: any) {
  constructor (request: Hapi.Request, response: Hapi.ResponseToolkit) {
    super()
    this.url = request.url
    this.path = request.path
    this.payload = request.payload
    this.query = request.query
    this.params = request.params
    this.paramsArray = request.paramsArray
    this.headers = request.headers
    this.cookies = request.state

    this.request = request
    this.response = response
  }

}
