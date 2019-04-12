import { Middleware, IMiddleware, Request, Response } from 'jweb'

@Middleware
export default class Auth implements IMiddleware {

  public pre(req: Request, res: Response, next: any): void {
    console.log('this is auth middleware req')
    next()
  }

  public post(req: Request, res: Response, next: any): void {
    console.log('this is auth middleware res')
    next()
  }

}
