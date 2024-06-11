<script setup lang='ts'>
import { definePageMeta, navigateTo, useSanctumClient, useSanctumUser } from '#imports';
import { reactive } from 'vue';

definePageMeta({
    middleware: 'sanctum:guest',
    layout: 'guest'
})

// REGISTER USER
const form = reactive({
    name: 'Clark Tolosa',
    email: 'clarktolosa@gmail.com',
    password: 'password',
    password_confirmation: 'password',
})
async function handleRegisterUser() {
    const client = useSanctumClient()
    await client('/register', {
        method: 'post',
        body: { ...form }
    })

    const user = useSanctumUser()
    user.value = await client('/api/auth')
    await navigateTo('/a')
}
</script>

<template>
    <form @submit.prevent="handleRegisterUser">
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="form.name">
        </div>
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="form.email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="form.password">
        </div>
        <div>
            <label for="password_confirmation">Confirm Password</label>
            <input type="password" name="password_confirmation" id="password_confirmation"
                v-model="form.password_confirmation">
        </div>
        <button>Register</button>
    </form>
</template>