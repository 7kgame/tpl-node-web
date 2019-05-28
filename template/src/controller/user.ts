import { Autowired, BusinessException } from 'jbean'
import { Controller, Get, Post, Request, Response, Transactional, Validation, ValidationMode, Cache } from '../lib'
import UserService from '../lib/account/UserService'
import PayService from '../lib/account/PayService'
import Auth from '../annos/Auth'
import ResponseBody from '../annos/response_body'
import UserEntity from '../lib/account/entity/user'

import BaseController from './base'

@Controller('/user')
@Transactional
// @Auth
// @ResponseXML
export default class User extends BaseController {

  @Autowired
  private userService: UserService

  @Autowired
  private payService: PayService

  constructor () {
    super()
    console.log('init user')
  }

  private preAround (ret) {
    console.log('preAround', ret)
  }

  private postAround (ret) {
    let result = {
      status: 0,
      data: ret.data,
      message: null
    }
    if (ret.err) {
      if (ret.err instanceof BusinessException) {
        result.status = ret.err.code || -1
        result.data = ret.err.data
        result.message = ret.err.err || '系统异常'
      } else {
        result.status = -1
        result.message = ret.err
      }
    }
    return {
      err: null,
      data: result
    }
  }

  private beforeCall (ret, req: Request, res: Response) {
    // res.setHeader('Content-Type', 'application/json')
    // console.log(arguments)
    console.log('beforeCall' , ret)
    return ret
  }

  public afterCall (ret) {
    // console.log('aftercall', ret)
    // ret.data = xmlEncode(ret.data)
    // return ret
    // if (ret.err) {
    //   return {
    //     status: ret.err.code || -1,
    //     message: ret.err,
    //     data: ret.data
    //   }
    // } else {
    //   return ret
    // }
  }

  @Get('/process/{uid}')
  @Auth
  @ResponseBody('json')
  @Validation(UserEntity)
  @Transactional
  public async process (req: Request, res: Response, { uid }) {
    console.log(UserService)
    const user: UserEntity = req.entity
    // throw new BusinessException('inner err', -100, null)
    console.log('inside call', user, uid)
    // console.log(user['toObject']())
    // console.log('userService is', this.userService)
    // throw new Error('hdhhsh')
    // console.log('uid is ' + uid)
    // return uid
    // throw new Error('test err')
    // let data = await this.userService.hello()
    // return '<div style="color: red">' + 'this is user process ' + uid + ', ' + JSON.stringify(data) + ', ' + this.payService.hello() + '</div>'
    let u = await this.userService.hello(user)

    // throw new BusinessException('test Exception')
    let data = {
      a: 1,
      b: [2, 3, 4],
      uid: uid,
      u: u
    }
    return data
  }

  @Get('/list')
  public list () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('uid', 1)
    this.templateValue('name', '<span>Jim</span>')
    return this.show('page')
  }

  @Get('/list2')
  public list2 () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('uid', 2)
    this.templateValue('name', '<span>tim</span>')
    return this.show('page')
  }

  @Get('/info')
  @ResponseBody('json')
  @Auth
  @Cache(1000 * 60)
  // @ResponseXML
  public info(request: Request, response: Response) {
    // console.log('user/info exec')
    // response.error('出错啦')
    // return null
    let test = {"a": {k:1, k2: null, k3: false, k4: 'hello'}}
    return test
  }
}

