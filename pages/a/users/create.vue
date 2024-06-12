<script setup lang='ts'>
import { definePageMeta, navigateTo, reactive, useSanctumClient } from '#imports';
import Button from '~/components/Button.vue';
import FormField from '~/components/FormField.vue';
import FormFieldErrors from '~/components/FormFieldErrors.vue';
import Header from '~/components/Header.vue';
import Input from '~/components/Input.vue';
import Label from '~/components/Label.vue';
import Main from '~/components/Main.vue';
import type { AdminCreateUserCredentials, AdminCreateUserCredentialsErrors } from '~/utils/types/User';

definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'admin-aside'
})

// CREATE USER
const formErrors = reactive<AdminCreateUserCredentialsErrors>({
    name: [],
    email: []
})
const formData = reactive<AdminCreateUserCredentials>({
    name: '',
    email: ''
})
async function handleCreateUser() {
    const client = useSanctumClient()
    await client('/api/users', {
        method: 'post',
        body: { ...formData },
        async onResponse(context) {
            if (!context.response.ok) return

            await navigateTo('/a/users')
        }
    }).catch((responseError) => {
        const errors = responseError.data.errors as typeof formErrors
        for (const error of Object.keys(errors)) {
            const key = error as keyof typeof formErrors
            formErrors[key] = errors[key]
        }
    })
}
</script>

<template>
    <Main className="flex flex-col gap-y-4">
        <Header>Create User</Header>
        <form class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleCreateUser">
            <FormField>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" v-model="formData.name" required />
                <FormFieldErrors :list="formErrors.name" />
            </FormField>
            <FormField>
                <Label for="email">Email</Label>
                <Input type="text" name="email" id="email" v-model="formData.email" required />
                <FormFieldErrors :list="formErrors.email" />
            </FormField>
            <Button>Create</Button>
        </form>
    </Main>
</template>