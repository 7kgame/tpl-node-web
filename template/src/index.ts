import { Application, AppErrorEvent } from 'jweb'
import { JBootApplication } from 'jbean'


@JBootApplication
class App {

  public static main (configs) {
    Application.start()
    // .then(application => { // test event
    //   application.on(AppErrorEvent.REQUEST, err => {
    //     // console.error('app error: ', err)
    //   })
    // })
  }

}
