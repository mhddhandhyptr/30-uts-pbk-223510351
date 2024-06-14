import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import App from './App.vue';
import router from './router'; // Mengimpor router dari src/router.js

const app = createApp(App);
app.use(createPinia());
app.use(Quasar);
app.use(router);
app.mount('#app');
