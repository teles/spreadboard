<template>
    <article class="message">
        <div class="message-header">
            <p>{{data.$data.title}}</p>
        </div>
        <div class="message-body">
            <p>{{data.$data.text}}
            <p>{{data.$data.more}}</p>
        </div>
    </article>
</template>

<script>
    export default {
        props: ["data"]
    }
</script>

