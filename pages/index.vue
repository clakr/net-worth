<script setup lang='ts'>
import { definePageMeta, useSanctumAuth } from '#imports';
import { reactive } from 'vue';

definePageMeta({
    middleware: 'sanctum:guest',
    layout: 'guest'
})

// LOGIN USER
const form = reactive({
    email: 'test@example.com',
    password: 'password'
})
async function handleLoginUser() {
    const auth = useSanctumAuth()
    await auth.login({ ...form })
}
</script>

<template>
    <form @submit.prevent="handleLoginUser">
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="form.email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="form.password">
        </div>
        <button>Login</button>
    </form>
</template>