import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import createStore from "@store/main.ts";
const app = createApp(App);
app.use(createStore);
app.mount('#app')
