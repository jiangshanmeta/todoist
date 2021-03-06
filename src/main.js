import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
    sync,
} from 'vuex-router-sync';
import VueConfigs from 'vue-configs';
import 'normalize.css';
import '@/assets/css/layout.css';
import '@/assets/css/table.css';
import '@/assets/css/text.css';
import './plugins/element.js';
Vue.use(VueConfigs, {
    optionKeys: [
        'config', 'staticMethod', 'state',
    ],
});
Vue.config.productionTip = false;

sync(store, router);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
