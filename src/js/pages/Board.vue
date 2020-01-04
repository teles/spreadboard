<template>
    <div class="section">
        <div v-for="row in activeBoard.rows" style="margin-bottom: 20px;">
            <component v-bind:is="default" :data="row"></component>
        </div>
    </div>
</template>
<script>
    import Default from "../templates/Default.vue";

    export default {
        data() {
            return {
                default: Default
            }
        },
        computed: {
            activeBoard() {
                return this.$store.state.boards.find(board => board.id === this.$route.params.id);
            }
        }
    }
</script>