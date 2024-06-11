<script setup lang='ts'>
import { useSanctumAuth, useSanctumUser } from '#imports';
import type { Resource } from '~/utils/types';
import type { User } from '~/utils/types/User';

// GET AUTHED USER
const user = useSanctumUser<Resource<User>>()

// LOGOUT USER
async function handleLogoutUser() {
    const auth = useSanctumAuth()
    await auth.logout()
}
</script>

<template>
    <nav v-if="user">
        <NuxtLink to="/a">Home</NuxtLink>
        <span>{{ user.data.name }}</span>
        <button type="button" @click="handleLogoutUser">Logout</button>
    </nav>
    <slot />
</template>