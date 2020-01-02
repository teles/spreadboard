<template>
    <div>
        <div> {{ activeBoard }} </div>
    </div>
</template>
<script>

    export default {
        computed: {
            activeBoard () {
                return this.$store.state.boards.find(board => board.id === this.$route.params.id);
            }
        }
    }
</script>