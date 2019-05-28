import { BaseController } from 'jweb'

export default class Controller extends BaseController {

  constructor () {
    super()
    // TODO: 根据开发和生产环境分别设置静态资源路径
    // 注意：生产环境下，静态资源存放在CDN上
    this.templateValue('ASSETS', './')
  }

}
