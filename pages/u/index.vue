<script setup lang='ts'>
import { definePageMeta } from '#imports';
import Main from '~/components/Main.vue';

definePageMeta({
    middleware: 'user',
    layout: 'user-aside'
})
</script>

<template>
    <Main>
        <h1>user dashboard!</h1>
    </Main>
</template>