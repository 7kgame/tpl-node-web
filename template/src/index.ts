import { Application, AppErrorEvent } from 'jweb';
import * as Path from 'path';

let viewDir = 'view';
if (process.env.NODE_ENV === 'development') {
  viewDir = Path.join(Path.dirname(Path.dirname(__dirname)), 'src', 'view');
}

Application.create({
    port: <%= port %>,
    host: '<%= host %>',
    propertyNS: 'node-web',
    assets: Path.join(Path.dirname(__dirname),  'assets'),
    viewDir: viewDir
  })
  .start(__dirname)
  .then((application: Application) => { // test event
    application.on(AppErrorEvent.REQUEST, err => {
      console.error('app error: ', err);
    });
  });

