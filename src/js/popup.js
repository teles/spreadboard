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
            state: {
                configs: {},
                boards: []
            },
            mutations: {
                updateBoards(state, boards) {
                    state.boards = boards;
                }
            },
            getters: {
                boardById: (state, id) => {
                    return state.boards.find(board => board.id === id);
                }
            }
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
            main.innerHTML = "";
        }
    });
}

window.onload = onLoadWindow;
