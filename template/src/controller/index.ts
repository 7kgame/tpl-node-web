import { BaseController, Controller, Get } from 'jweb'

@Controller('/')
export default class Index extends BaseController {

  constructor () {
    super()
  }

  @Get('/')
  public index () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('games', [
      {
        title: '疯狂的方言'
      },
      {
        title: '坦克大战'
      },
    ])
    return this.show('index')
  }

}

