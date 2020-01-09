<template>
    <div class="section">
        <div v-for="row in activeBoard.rows" style="margin-bottom: 20px;">
            <component v-bind:is="templates[activeBoard.$configs.template]" :data="row"></component>
        </div>
    </div>
</template>
<script>

    import ApplicationSettings from "../ApplicationSettings.js";

    export default {
        data() {
            return {
                templates: ApplicationSettings.templates
            }
        },
        computed: {
            activeBoard() {
                return this.$store.state.boards.find(board => board.id === this.$route.params.id);
            }
        }
    }
</script>