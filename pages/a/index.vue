<script setup lang='ts'>
import { definePageMeta } from '#imports';
import Main from '~/components/Main.vue';

definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'admin-aside'
})
</script>

<template>
    <Main>
        <h1>admin dashboard!</h1>
    </Main>
</template>