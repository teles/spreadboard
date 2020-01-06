<template>
    <ul>
        <li>
            <a v-bind:href="data.$data.text">{{data.$data.title}}</a>
            <small v-if="data.$data.subtitle">{{data.$data.subtitle}}</small>
        </li>
    </ul>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>

