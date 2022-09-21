import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axiosConfiguration.js';

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.use(store)

const initialize =()=>{
    {
        if(localStorage.getItem("userData") != null){
           store.dispatch("attemptUserProfile", localStorage.getItem("userData"));
        }
    }
}

 initialize();

app.mount('#app')
