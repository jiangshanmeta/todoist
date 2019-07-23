import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueConfigs from 'vue-configs';
import 'normalize.css';
import './plugins/element.js';
Vue.use(VueConfigs, {
    optionKeys: [
        'config', 'staticMethod', 'state',
    ],
});
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
