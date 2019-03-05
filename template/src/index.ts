import { Application } from 'jweb';

Application.create()
  .options({
    port: <%= port %>,
    host: '<%= host %>',
    propertyNS: 'node-web',
  })
  .start(__dirname);

