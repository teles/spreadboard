<script>
    import ExtensionFooter from "./components/ExtensionFooter.vue";
    import ExtensionHeader from "./components/ExtensionHeader.vue";
    import axios from "axios";
    import SpreadsheetParser from "./spreadsheet-parser/SpreadsheetParser";

    export default {
        name: "app",
        data() {
            return {
                data: {},
                isLoading: null,
                search: null,
                configs: {
                    tabs: [{
                        id: "1qQVqf4n9TBg1p1Uu7kDZyR3ApZUJYVs7XcuB7YuOVEc",
                        theme: "green",
                        layout: {
                            type: "default",
                            adapter: {"title": "Termo", "text": "Definição", "more": "Exemplo"}
                        }
                    }]
                }
            };
        },
        computed: {
            filteredRows() {
                return this.search !== null
                    ? this.data.rows.filter(row => row.$adapted.title.toLowerCase().includes(this.search.toLowerCase()))
                    : this.data.rows;
            },
            link() {
                return `https://docs.google.com/spreadsheets/d/${this.configs.tabs[0].id}/edit`;
            }
        },
        components: {
            "extension-footer": ExtensionFooter,
            "extension-header": ExtensionHeader
        },
        mounted() {
            this.isLoading = true;
            axios
                .get(`https://spreadsheets.google.com/feeds/cells/${this.configs.tabs[0].id}/1/public/full?alt=json`)
                .then(response => new SpreadsheetParser(response.data, this.configs.tabs[0].layout.adapter))
                .then(spreadsheet => this.data = spreadsheet)
                .finally(response => {
                    this.isLoading = false;
                    return response;
                })
        }
    };
</script>

<style lang="sass" src="bulma"></style>

<template>
    <div>
        <extension-header :title="this.data.title" :theme="this.configs.tabs[0].theme" :link="this.link"></extension-header>

        <div class="section container" style="margin-top: -40px;" v-if="this.isLoading === true">
            <p class="title is-4">Carregando...</p>
        </div>
        <div class="section container" style="margin-top: -40px;" v-else>

            <div class="field is-horizontal" style="padding-bottom: 0; padding-top: 20px;">
                <div class="field-label is-normal">
                    <label class="label">Filtrar</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input is-small" type="text" placeholder="Filtrar" v-model="search">
                        </p>
                    </div>
                </div>
            </div>

            <div v-for="row in filteredRows" style="margin-bottom: 20px;">
                <article class="message">
                    <div class="message-header">
                        <p>{{row.$adapted.title}}</p>
                    </div>
                    <div class="message-body">
                        <p>{{row.$adapted.text}}
                        <p>{{row.$adapted.more}}</p>
                    </div>
                </article>
            </div>

        </div>
        <extension-footer></extension-footer>
    </div>
</template>