<script setup lang='ts'>
import { definePageMeta } from '#imports';

definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'admin'
})
</script>

<template>
    <h1>admin dashboard!</h1>
</template>