<script>
    let data = {};

    export default {
        name: "ExtensionHeader",
        data () {
            return data;
        }
    }
</script>

<template>
    <header class="hero">
        <div class="hero-body">
            <h1 class="title is-4">Teste</h1>
        </div>
        <div class="hero-foot">
            <nav class="tabs is-boxed is-fullwidth">
                <div class="container">
                    <ul>
                        <router-link active-class="is-active" to="/overview" tag="li"><a>Resumo</a></router-link>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
</template>