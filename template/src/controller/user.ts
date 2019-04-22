import { Autowired } from 'jbean'
import { Controller, Get, Post, ResponseBody, Request, Response, Validation } from 'jweb'

import BaseController from './base'
import Auth from '../lib/annos/Auth'
import UserService from '../lib/account/UserService'
import UserEntity from '../lib/account/entity/user'

@Controller('/user')
@Auth
export default class User extends BaseController {

  @Autowired('userService0')
  private userService: UserService

  constructor () {
    super()
  }

  private beforeCall () {
    console.log('beforeCall')
  }

  private afterCall (ret, request: Request, response: Response) {
    console.log('afterCall')
    return ret
  }


  @Get('/get/{uid}')
  @ResponseBody('json')
  public async getUser (req: Request, res: Response, { uid }) {
    return this.userService.getUser({uid: uid})
  }

  @Get('/del/{uid}')
  @ResponseBody('json')
  public async deleteUser (req: Request, res: Response, { uid }) {
    return this.userService.deleteUser({uid: uid})
  }

  @Get('/edit/{uid}')
  @ResponseBody('json')
  @Validation(UserEntity)
  public async editUser (req: Request, res: Response, { uid }) {
    const user: UserEntity = req.entity
    return this.userService.updateUser(user, {uid: uid})
  }

  @Get('/create')
  @ResponseBody('json')
  @Validation(UserEntity)
  public async createUser (req: Request, res: Response) {
    const user: UserEntity = req.entity
    return this.userService.createUser(user)
  }

  @Get('/list')
  @ResponseBody('json')
  public async getUsers (req: Request, res: Response) {
    const user: UserEntity = req.entity
    const query = req.query
    const condition = {}
    if (query.name) {
      condition['name'] = query.name
    }
    return this.userService.getUsers(condition)
  }

  @Get('/tpl')
  public list () {
    this.templateValue('contentInfo', './header/css/main.css')
    this.templateValue('uid', 1)
    this.templateValue('name', '<span>Jim</span>')
    return this.show('page')
  }

  @Get('/xml')
  @ResponseBody('xml')
  @Auth(true)
  public info(request: Request, response: Response) {
    let test = new Map()
    test.set("a", {k:1, k2: null, k3: false, k4: 'hello'})
    return test
  }
}

