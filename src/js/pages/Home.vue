<template>
    <div class="section">
        <div v-for="(board, index) in boards" style="margin-bottom: 40px;">
            <p class="title is-5 has-text-info">
                <span>{{index + 1}}) {{board.title}}</span>
                <small class="is-link"></small>
            </p>
            <div class="columns is-mobile">
                <div class="column is-6">
                    <form-select-field
                            :title="'Template'"
                            :values="templates"
                            :value="board.$configs.template">
                    </form-select-field>
                </div>
                <div class="column is-6">
                    <form-select-field
                            :title="'Cor'"
                            :values="themes"
                            :value="board.$configs.theme">
                    </form-select-field>
                </div>
            </div>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Elemento</th>
                    <th>Valor</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value, item) in board.$configs.adapter">
                    <td>{{ item }}</td>
                    <td contenteditable="true" @input="onInput">{{ value }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import ApplicationSettings from "../ApplicationSettings.js";
    import FormSelectField from "../components/FormSelectField.vue";

    export default {
        computed: {
            boards() {
                return this.$store.state.boards;
            },
            themes() {
                return ApplicationSettings.themes;
            },
            templates() {
                return ApplicationSettings.templates;
            }
        },
        methods: {
            onInput(e) {
                console.log(e.target.innerText);
            },
        },
        components: {
            FormSelectField
        }
    }
</script>