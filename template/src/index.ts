import { Application, AppErrorEvent } from 'jweb'
import { JBootApplication } from 'jbean'

@JBootApplication
class App {

  public static main (configs) {
    Application.start()
  }

}


