<script setup lang='ts'>
import Aside from '~/components/Aside.vue';
import NavAuth from '~/components/Nav.auth.vue';
import Button from '~/components/Button.vue';
</script>

<template>
    <div className="min-h-screen grid grid-cols-[300px_calc(100svw-300px)] grid-rows-[69px_1fr]">
        <Aside className="row-span-2 flex flex-col">
            <Button to="/a/users" variant="subtle">
                Users
            </Button>
        </Aside>
        <NavAuth />
        <slot />
    </div>
</template>