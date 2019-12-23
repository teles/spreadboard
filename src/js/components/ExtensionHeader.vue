<script>
    let data = {};

    export default {
        name: "ExtensionHeader",
        data () {
            return data;
        },
        props: ["title", "theme", "link"]
    }
</script>

<template>
    <header class="hero" v-bind:class="{'is-success': theme === 'green', 'is-warning': theme === 'yellow', 'is-danger': theme === 'red' }">
        <div class="hero-body">
            <h1 class="title is-3">{{this.title}}</h1>
            <a v-if="this.link" :href="this.link" target="_blank">editar</a>
        </div>
        <div class="hero-foot">
            <nav class="tabs is-boxed is-fullwidth">
                <div class="container">
                    <ul>
                        <li class="is-active"><a>{{this.title}}</a></li>
                        <li><a>Exemplo</a></li>
                        <li><a>Exemplo</a></li>
                        <li><a>Exemplo</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>