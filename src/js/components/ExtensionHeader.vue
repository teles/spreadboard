<script>
    let data = {};

    export default {
        name: "ExtensionHeader",
        data() {
            return data;
        },
        methods: {
            isThisBoardActive(boardId) {
                return boardId === this.$route.params.id;
            }
        },
        computed: {
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
    <header class="hero is-info is-bold">
        <div class="hero-body">
            <h1 class="title is-3">{{ this.title }}</h1>
            <h2 class="subtitle is-6">
                <a class="is-link is-link--dotted" v-if="isHome === false"
                   v-bind:href="'https://docs.google.com/spreadsheets/d/' + activeBoard.id + '/edit'"
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