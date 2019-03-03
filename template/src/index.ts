import { Application } from 'qk-web';

Application.create()
  .options({
    port: <%= port %>,
    host: '<%= host %>',
    propertyNS: 'node-web',
  })
  .start(__dirname);

