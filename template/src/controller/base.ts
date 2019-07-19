import { BaseController, Request, Response } from 'jweb'
import { BusinessException } from 'jbean'

export default class Controller extends BaseController {

  protected beforeCall (ret, req: Request, res: Response) {
    return ret
  }

  protected afterCall (ret) {
  }

  protected preAround (ret) {
    console.log('preAround', ret)
  }

  protected postAround (ret) {
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

}
