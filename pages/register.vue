<script setup lang='ts'>
import { definePageMeta, navigateTo, useSanctumClient, useSanctumUser } from '#imports';
import { reactive } from 'vue';
import Input from '~/components/Input.vue';
import Label from '~/components/Label.vue';

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
    <Main>
        <form class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleRegisterUser">
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" v-model="form.name" />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" v-model="form.email" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" v-model="form.password" />
            </FormGroup>
            <FormGroup>
                <Label for="password_confirmation">Confirm Password</Label>
                <Input type="password" name="password_confirmation" id="password_confirmation"
                    v-model="form.password_confirmation" />
            </FormGroup>
            <Button>Register</Button>
        </form>
    </Main>
</template>