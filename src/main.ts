import { createApp } from 'vue'
import './style.css'
import "@/assets/css/_reset.less";

import store from "@/stores";
import router from '@/router';

import { getAssetsFile, encodedString, formatDate } from '@/utils/format';

import App from './App.vue'

const app = createApp(App);


Promise.all([import("vue"), import("axios"), import("axios-jsonp")]).then(async (rets) => {

    [window.Vue, window.axios, window.axiosJsonpAdapter] = rets;


    app.config.globalProperties.$require = getAssetsFile;
    app.config.globalProperties.$format = {
        html: encodedString,
        date: formatDate
    };

    app.use(store);
    app.use(router);

    app.mount('#app');
});


