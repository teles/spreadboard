<template>
    <div class="section">
        <div v-for="(board, index) in boards">
            <p class="title is-5 has-text-info">{{index + 1}}) {{board.title}}</p>

            <div class="columns is-mobile">
                <div class="column is-6">
                    <div class="field">
                        <label class="label">Template:</label>
                        <div class="control">
                            <div class="select">
                                <select>
                                    <option>{{board.$configs.template}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="column is-6">
                    <div class="field">
                        <label class="label">Cor:</label>
                        <div class="control">
                            <div class="select">
                                <select v-model="board.$configs.theme">
                                    <option v-for="(theme, key) in themes" :value="key">{{key}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
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
                    <td>{{ value }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import ApplicationSettings from "../ApplicationSettings.js";

    export default {
        computed: {
            boards() {
                return this.$store.state.boards;
            },
            themes() {
                return ApplicationSettings.themes;
            }
        },
        components: {}
    }
</script>