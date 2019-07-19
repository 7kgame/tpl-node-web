import { Controller, Get } from 'jweb'

import BaseController from './base'

@Controller('/')
export default class Index extends BaseController {

  constructor () {
    super()
  }

  @Get('/')
  public static index () {
    return 'hello'
  }
}
