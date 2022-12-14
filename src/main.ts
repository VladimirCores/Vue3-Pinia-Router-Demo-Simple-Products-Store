import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { anu } from 'anu-vue';

import App from './App.vue';
import router from './router';

// UnoCSS import
import 'uno.css';

// anu styles
import 'anu-vue/dist/style.css';

// default theme styles
import '@anu-vue/preset-theme-default/dist/styles.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(anu);

app.mount('#app');
