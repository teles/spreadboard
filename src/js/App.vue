<script>

    import axios from "axios";
    import ExtensionHeader from "./components/ExtensionHeader.vue";
    import ExtensionFooter from "./components/ExtensionFooter.vue";
    import ApplicationSettings from "./ApplicationSettings.js";
    import SpreadsheetParser from "./spreadsheet-parser/SpreadsheetParser";

    export default {
        name: "app",
        data() {
            return {
                isLoading: null,
                search: null,
                configs: ApplicationSettings.samples
            };
        },
        computed: {},
        components: {
            "extension-footer": ExtensionFooter,
            "extension-header": ExtensionHeader
        },
        mounted() {
            this.isLoading = true;
            const requests = this.configs.tabs.map(tab =>
                axios.get(`https://spreadsheets.google.com/feeds/cells/${tab.id}/${tab.pageNumber || "1"}/public/full?alt=json`));

            axios
                .all(requests)
                .then(axios.spread((one, two, three, four) => {
                    return [one, two, three, four]
                        .filter(x => x)
                        .map((response, index) => {
                            return new SpreadsheetParser(response.data, this.configs.tabs[index]);
                        });
                })).then(boards => {
                this.data = boards;
                this.$store.commit("updateBoards", boards);
            }).finally(response => {
                this.isLoading = false;
                return response;
            });
        }
    };
</script>

<style lang="sass" src="bulma"></style>

<template>
    <div>
        <extension-header></extension-header>
        <div class="section" v-if="this.isLoading === true">
            <p class="title is-4">Carregando...</p>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
        <extension-footer></extension-footer>
    </div>
</template>