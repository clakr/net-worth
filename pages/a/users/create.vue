<script setup lang='ts'>
import { definePageMeta, navigateTo, reactive, useSanctumClient } from '#imports';
import Button from '~/components/Button.vue';
import FormField from '~/components/FormField.vue';
import FormFieldErrors from '~/components/FormFieldErrors.vue';
import Header from '~/components/Header.vue';
import Input from '~/components/Input.vue';
import Label from '~/components/Label.vue';
import Main from '~/components/Main.vue';
import capitalizeFirstLetter from '~/composables/capitalizeFirstLetter';
import { UserRole, type AdminCreateUserCredentials, type AdminCreateUserCredentialsErrors } from '~/utils/types/User';

definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'admin-aside'
})

// CREATE USER
const formErrors = reactive<AdminCreateUserCredentialsErrors>({
    name: [],
    email: [],
    role: []
})
const formData = reactive<AdminCreateUserCredentials>({
    name: '',
    email: '',
    role: UserRole.ADMIN
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
            <FormField className="*:flex *:items-center *:gap-x-2">
                <div v-for="userRole in UserRole">
                    <input type="radio" name="role" :id="userRole" :value="userRole" v-model="formData.role" required>
                    <Label :for="userRole">{{ capitalizeFirstLetter(userRole) }}</Label>
                </div>
                <FormFieldErrors :list="formErrors.role" />
            </FormField>
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