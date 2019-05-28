import { Controller, Get, Post } from '../lib'
import BaseController from './base'

@Controller('/pay')
export default class Pay extends BaseController {

  constructor () {
    super()
    console.log('init pay')
  }

  @Get('/process')
  public process (): void {
    setTimeout(function () {
      throw new Error('opps')
    }, 1000)
    console.log('this is pay process')
  }

  @Post('/edit')
  public edit (): void {
    console.log('this is pay edit')
  }

  @Get('/list')
  public list () {
    console.log('this is pay list')
    return 1
  }
}

