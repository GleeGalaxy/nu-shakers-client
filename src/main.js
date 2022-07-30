import { createApp } from 'vue'
import routes from './javascript/routes.js'
import store from './javascript/store/store.js';

import App from './App.vue'

const app = createApp(App);
app.use(routes);
app.use(store);
app.mount('#app');

// Check how players are modified to make sure the points are numbers
