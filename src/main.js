import './axiosConfiguration.js';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css' 
import 'notyf/notyf.min.css';  
 
const app = createApp(App)

app.use(router)

app.use(store)
 
if(localStorage.getItem("userData") != null){
    store.dispatch("attemptUserProfile", localStorage.getItem("userData"));
}
 
app.mount('#app')
