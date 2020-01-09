<template>
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
        <tr>
            <th>Elemento</th>
            <th>Valor</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, item) in board.$configs.adapter">
            <td>{{ item }}</td>
            <td contenteditable="true" @input="onInput">{{ value }}</td>
        </tr>
        </tbody>
    </table>
</template>