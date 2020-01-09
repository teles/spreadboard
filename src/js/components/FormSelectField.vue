<template>
    <div class="field">
        <label class="label">{{title}}:</label>
        <div class="control">
            <div class="select">
                <select v-model="value">
                    <option v-for="(currentValue, key) in values" :value="key">{{key}}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ["title", "values", "value"]
    }

</script>