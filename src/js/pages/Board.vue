<template>
    <div class="section">
        <div v-for="row in activeBoard.rows" style="margin-bottom: 20px;">
            <component v-bind:is="basic" :data="row"></component>
        </div>
    </div>
</template>
<script>
    import Basic from "../templates/Basic.vue";

    export default {
        data() {
            return {
                basic: Basic
            }
        },
        computed: {
            activeBoard() {
                return this.$store.state.boards.find(board => board.id === this.$route.params.id);
            }
        }
    }
</script>