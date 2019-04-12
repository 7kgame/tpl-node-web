import { Controller, Get, Post, Autowired, ResponseJSON, ResponseXML, Request, Response } from 'jweb'

import BaseController from './base'
import UserService from '../lib/account/UserService'
import PayService from '../lib/account/PayService'
import { Auth } from '../lib/middleware'

@Controller('/user', [Auth])
// @ResponseXML
export default class User extends BaseController {

  @Autowired('userService0')
  private userService: UserService

  @Autowired
  private payService: PayService

  constructor () {
    super()
  }

  @Get('/process/{uid}')
  public async process ({ uid }) {
    let data = await this.userService.hello()
    console.log(data)
    return '<div style="color: red">' + 'this is user process ' + uid + ', ' + JSON.stringify(data) + ', ' + this.payService.hello() + '</div>'
  }

  @Get('/list')
  public list () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('uid', 1)
    this.templateValue('name', '<span>Jim</span>')
    return this.show('page')
  }

  @Get('/info')
  @ResponseJSON
  // @ResponseXML
  public info(request: Request, response: Response) {
    console.log('user/info exec')
    response.error('出错啦')
    return null
    let test = new Map()
    test.set("a", {k:1, k2: null, k3: false, k4: 'hello'})
    return test
  }
}

