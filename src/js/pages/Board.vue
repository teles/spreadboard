<template>
    <div class="section">
        <div v-for="row in activeBoard.rows" style="margin-bottom: 20px;">
            <component v-bind:is="BoxesPlusImage" :data="row"></component>
        </div>
    </div>
</template>
<script>
    import Basic from "../templates/Basic.vue";
    import BoxesPlusImage from "../templates/BoxesPlusImage.vue";

    export default {
        data() {
            return {
                Basic,
                BoxesPlusImage
            }
        },
        computed: {
            activeBoard() {
                return this.$store.state.boards.find(board => board.id === this.$route.params.id);
            }
        }
    }
</script>