import { Application, AppErrorEvent } from 'jweb';
import * as Path from 'path';

Application.create({
    port: <%= port %>,
    host: '<%= host %>',
    propertyNS: 'node-web',
    assets: Path.join(Path.dirname(__dirname),  'assets')
  })
  .start(__dirname)
  .then((application: Application) => { // test event
    application.on(AppErrorEvent.REQUEST, err => {
      console.error('app error: ', err);
    });
  });

