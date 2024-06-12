<script setup lang='ts'>
import { definePageMeta, useSanctumAuth } from '#imports';
import { reactive } from 'vue';
import Main from '~/components/Main.vue';
import Button from '~/components/Button.vue';
import FormField from '~/components/FormField.vue';

definePageMeta({
    middleware: 'sanctum:guest',
    layout: 'guest'
})

// LOGIN USER
const form = reactive({
    email: 'test@admin.com',
    password: 'password'
})
async function handleLoginUser() {
    const auth = useSanctumAuth()
    await auth.login({ ...form })
}
</script>

<template>
    <Main>
        <form class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleLoginUser">
            <FormField>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" v-model="form.email" />
            </FormField>
            <FormField>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" v-model="form.password" />
            </FormField>
            <Button>Login</Button>
        </form>
    </Main>
</template>