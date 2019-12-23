import "../img/icon-34.png";
import "../img/icon-128.png";
import Vue from "vue/dist/vue.esm";
import VueRouter from "vue-router/dist/vue-router.esm";
import Vuex from 'vuex/dist/vuex.esm'
import routes from "./routes";
import App from "./App.vue";

let main;

chrome.runtime.onMessage.addListener(function(request) {
   if(request.action === "getPageSource"){
        Vue.use(VueRouter);
        Vue.use(Vuex);

        const store = new Vuex.Store({
            state: {},
            mutations: {}
        });

        const router = new VueRouter({routes});

        new Vue({
            el: "[data-selector='app']",
            data: {},
            router,
            store,
            components: {
                "app": App
            }
        });

   }
});

function onLoadWindow(){
    main = document.querySelector("[data-selector='main']");

    chrome.tabs.executeScript(null, {
        file: "./get-page-source.bundle.js"
    }, function(){
        if (chrome.runtime.lastError) {
            // title.innerText = "Ocorreu um erro ao injetar script";
            // subtitle.innerText = chrome.runtime.lastError.message;
            main.innerHTML = "";
        }
    });
}

window.onload = onLoadWindow;
