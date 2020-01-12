<script>
    import ApplicationSettings from "../ApplicationSettings.js";

    export default {
        name: "ExtensionHeader",
        data() {
            return {};
        },
        methods: {
            isThisBoardActive(boardId) {
                return boardId === this.$route.params.id;
            }
        },
        computed: {
            headerClass() {
                const headerClassMap = Object.keys(ApplicationSettings.themes).reduce((total, key) => {
                    total[key] = ApplicationSettings.themes[key].class;
                    return total;
                }, {});
                return this.isHome !== true ? headerClassMap[this.activeBoard.$configs.theme] : "is-info";
            },
            title() {
                return this.$route.params.id ? this.activeBoard.title : "Home";
            },
            isHome() {
                return this.activeBoard === null;
            },
            boards() {
                return this.$store.state.boards;
            },
            activeBoard() {
                console.log(this.$store.state.boards);
                return this.$route.params.id ? this.$store.state.boards.find(board => board.id === this.$route.params.id) : null;
            }
        }
    }
</script>
<style>
    .is-link--dotted:hover {
        border-bottom: 1px dotted #fff;
    }
</style>

<template>
    <header class="hero" v-bind:class="headerClass">
        <div class="hero-body">
            <h1 class="title is-3">{{ this.title }}</h1>
            <h2 class="subtitle is-6">
                <a class="is-link is-link--dotted" v-if="isHome === false"
                   v-bind:href="'https://docs.google.com/spreadsheets/d/' + activeBoard.href + '/edit'"
                target="_blank">editar</a>
                <span v-else class="is-link">&nbsp;</span>
            </h2>

        </div>
        <div class="hero-foot">
            <nav class="tabs is-boxed is-fullwidth">
                <div class="container">
                    <ul>
                        <li v-bind:class="{ 'is-active': isHome}">
                            <router-link :to="{name: 'home' }">&#9881;</router-link>
                        </li>
                        <li v-for="board in this.boards" v-bind:class="{ 'is-active': isThisBoardActive(board.id)}">
                            <router-link :to="{ name: 'board', params: { id: board.id }}">{{board.title}}</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>