import { createApp } from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import router from './router'
import { loadFonts } from './plugins/webfontloader'

import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

import './registerServiceWorker'
Amplify.configure(aws_exports);
applyPolyfills().then(() => {
  defineCustomElements(window);
});
loadFonts()
createApp(App)
  .use(router)
  .mount('#app')