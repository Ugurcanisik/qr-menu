import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import {store} from './store'


import VueMeta from 'vue-meta'
Vue.use(VueMeta)


import "./assets/loading.css"


Vue.config.productionTip = false

import axios from "axios";

axios.defaults.baseURL = "https://noxus-app-be-y4g5lbddia-ez.a.run.app/";
//axios.defaults.baseURL = "http://localhost:8081/";


Vue.filter("nameLoad", (name) => {
    let nameValue = name.split("-");
    if (nameValue.length > 1) {
        return name.split("-")[0] + '<br>' + name.split("-")[1]
    } else {
        return name.split("-")[0];
    }
})

Vue.filter("priceLoad", (price) => {
    let priceValue = price.split("-");
    if (priceValue.length > 1) {
        return price.split("-")[0] + '<br>' + price.split("-")[1]
    } else {
        return price.split("-")[0];
    }
})



new Vue({
    vuetify,
    router,
    store,

    render: h => h(App)
}).$mount('#app')
