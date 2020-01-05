<template>
    <div class="box box--shadowed"
         v-bind:class="{'box--shadowed--on-hover' : isHovered}"
         v-bind:style="{maxHeight: isExpanded ? '2000px' : '180px'}">

        <article class="media">
            <div class="media-left" v-if="data.$adapted.image">
                <figure class="image is-96x96">
                    <img v-bind:src="data.$adapted.image"
                         v-bind:alt="data.$adapted.title">
                </figure>
            </div>
            <div class="media-content">
                <div class="content">
                    <p>
                        <strong>{{ data.$adapted.title }}</strong>
                        <small>Capa Dura - 160 páginas</small>
                    </p>
                    <div
                         v-on:mouseover="isHovered = true"
                         v-on:mouseleave="isHovered = false"
                         v-on:click="isExpanded = !isExpanded"
                         style="cursor: pointer;">
                        <div v-html="data.$adapted.text"></div>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<style>

    .box--shadowed {
        transition: max-height ease-in-out .35s;
        overflow: hidden;
        position: relative;
    }

    .box--shadowed:after {
        text-align: center;
        font-size: 12px;
        width: 100%;
        content: "";
        bottom: 0;
        height: 30px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
        position: absolute;
        margin-left: -20px;
        pointer-events: none;
    }

    .box--shadowed--on-hover:after {
        background: linear-gradient(180deg, rgba(220, 220, 220, 0) 0%, rgba(200, 200, 200, 1) 100%);
    }
</style>

<script>
    export default {
        props: ["data"],
        data() {
            return {
                isHovered: false,
                isExpanded: false
            }
        }
    }
</script>

