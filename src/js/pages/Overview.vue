<template>
    <div>
        <recommendations></recommendations>
    </div>
</template>
<script>
    import Recommendations from "../components/Recommendations.vue";

    export default {
        computed: {
            title () {
                return `Teste`
            }
        },
        components: {
            "recommendations": Recommendations,
        }
    }
</script>