<script setup lang='ts'>
import { clearNuxtData, definePageMeta, navigateTo, reactive, refreshNuxtData, useAsyncData, useSanctumClient, watch } from '#imports';
import { useRoute } from 'vue-router';
import Main from '~/components/Main.vue';
import type { Resource } from '~/utils/types';
import type { AdminEditUserCredentials, AdminEditUserCredentialsErrors, User } from '~/utils/types/User';
import Header from '~/components/Header.vue';

definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'admin-aside'
})

// GET USER
const route = useRoute()
const userId = route.params.userId

const formErrors = reactive<AdminEditUserCredentialsErrors>({
    name: [],
    email: []
})
const formData = reactive<AdminEditUserCredentials>({
    name: '',
    email: ''
})

const client = useSanctumClient()
const { status, error } = await useAsyncData<Resource<User>>(
    () => client(`/api/users/${userId}`, {
        onResponse({ response }) {
            if (!response._data) return
            const { data } = response._data as Resource<User>

            formData.name = data.name
            formData.email = data.email
        }
    }),
    {
        lazy: true,
        server: false
    }
)

// EDIT USER
async function handleEditUser() {
    await client(`/api/users/${userId}`, {
        method: 'put',
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
        <Header>Edit User #{{ userId }}</Header>
        <form v-if="status !== 'error'" class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleEditUser">
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
            <Button>Edit</Button>
        </form>
        <p v-else>{{ error }}</p>
    </Main>
</template>