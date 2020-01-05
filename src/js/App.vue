<script>

    import ExtensionHeader from "./components/ExtensionHeader.vue";
    import ExtensionFooter from "./components/ExtensionFooter.vue";
    import SampleConfig from "./SampleConfig";
    import axios from "axios";
    import SpreadsheetParser from "./spreadsheet-parser/SpreadsheetParser";

    export default {
        name: "app",
        data() {
            return {
                isLoading: null,
                search: null,
                configs: SampleConfig
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
                axios.get(`https://spreadsheets.google.com/feeds/cells/${tab.id}/1/public/full?alt=json`));

            axios
                .all(requests)
                .then(axios.spread((one, two) => {
                    return [one, two].map((response, index) => {
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

        <!--<div class="section container" style="margin-top: -40px;" v-else>-->

            <!--<div class="field is-horizontal" style="padding-bottom: 0; padding-top: 20px;">-->
                <!--<div class="field-label is-normal">-->
                    <!--<label class="label">Filtrar</label>-->
                <!--</div>-->
                <!--<div class="field-body">-->
                    <!--<div class="field">-->
                        <!--<p class="control">-->
                            <!--<input class="input is-small" type="text" placeholder="Filtrar" v-model="search">-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <!--<div v-for="row in filteredRows" style="margin-bottom: 20px;">-->
                <!--<article class="message">-->
                    <!--<div class="message-header">-->
                        <!--<p>{{row.$adapted.title}}</p>-->
                    <!--</div>-->
                    <!--<div class="message-body">-->
                        <!--<p>{{row.$adapted.text}}-->
                        <!--<p>{{row.$adapted.more}}</p>-->
                    <!--</div>-->
                <!--</article>-->
            <!--</div>-->

        <!--</div>-->
        <extension-footer></extension-footer>
    </div>
</template>