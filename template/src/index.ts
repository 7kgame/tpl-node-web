import { Application, AppErrorEvent } from 'jweb';

Application.create()
  .options({
    port: <%= port %>,
    host: '<%= host %>',
    propertyNS: 'node-web',
  })
  .start(__dirname)
  .then((application: Application) => { // test event
    application.on(AppErrorEvent.REQUEST, err => {
      console.error('app error: ', err);
    });
  });

