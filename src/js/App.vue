<script>
    import ExtensionFooter from "./components/ExtensionFooter.vue";
    import ExtensionHeader from "./components/ExtensionHeader.vue";
    import axios from "axios";
    import SpreadsheetParser from "./spreadsheet-parser/SpreadsheetParser";

    export default {
        name: "app",
        data () {
            return {
                data: {},
                configs: {
                    tabs: [{
                        id: "1qQVqf4n9TBg1p1Uu7kDZyR3ApZUJYVs7XcuB7YuOVEc",
                        theme: "green",
                        layout: {
                            type: "default",
                            adapter: {"title" : "Termo", "text" : "Definição", "more": "Exemplo" }
                        }
                    }]
                }
            };
        },
        components: {
            "extension-footer": ExtensionFooter,
            "extension-header": ExtensionHeader
        },
        mounted() {
            axios
                .get(`https://spreadsheets.google.com/feeds/cells/${this.configs.tabs[0].id}/1/public/full?alt=json`)
                .then(response => new SpreadsheetParser(response.data, this.configs.tabs[0].layout.adapter))
                .then(spreadsheet => this.data = spreadsheet)
        }
    };
</script>

<style lang="sass" src="bulma"></style>

<template>
    <div>
        <extension-header></extension-header>
        <div class="section container">
            <div v-for="row in data.rows">
                {{row}}
            </div>
        </div>
        <extension-footer></extension-footer>
    </div>
</template>