import { Application, Task } from 'jweb'

@Task
export default class HelloTask {

  constructor () {
  }

  public async process(application: Application, args: any) {
    console.log('hello task', args)
  }
}
