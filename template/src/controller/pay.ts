import { Controller, Get, Post } from 'jweb'

@Controller('/pay')
export default class Pay {

  constructor () {
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
}

