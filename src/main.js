import {createApp} from 'vue';
import App from './App.vue';
import routes from '@/routes/routes';
import './assets/css/index.css';
import 'animate.css';

const app = createApp(App);
app.use(routes)
app.mount('#app');
