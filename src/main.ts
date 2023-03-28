import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router';
import { setHeader } from './services/axios';
import Vue3Toastify, { ToastContainerOptions } from 'vue3-toastify';

import { store } from './store';

//import VueAxios from 'vue-axios';

//createApp(App).mount('#app')
setHeader();

const app = createApp(App);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
//app.use(VueAxios, axios);
app.use(store);


app.mount('#app');
