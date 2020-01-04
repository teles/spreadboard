<template>
    <article class="message">
        <div class="message-header">
            <p>{{data.$adapted.title}}</p>
        </div>
        <div class="message-body">
            <p>{{data.$adapted.text}}
            <p>{{data.$adapted.more}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>

