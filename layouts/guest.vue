<script setup lang='ts'>
import Nav from '~/components/Nav.vue';


</script>

<template>
    <Nav className="flex items-center justify-end gap-x-2">
        <Button to="/register" variant="subtle">Register</Button>
        <Button to="/">Login</Button>
    </Nav>
    <slot />
</template>