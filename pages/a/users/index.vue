<script setup lang='ts'>
import { definePageMeta, refreshNuxtData, useAsyncData, useSanctumClient } from '#imports';
import Main from '~/components/Main.vue';
import type { Resource } from '~/utils/types';
import type { User } from '~/utils/types/User';
import Button from '~/components/Button.vue';
import Header from '~/components/Header.vue';
import Table from '~/components/Table.vue';

definePageMeta({
    middleware: 'sanctum:auth',
    layout: 'admin-aside'
})

// GET USERS
const client = useSanctumClient()
const { status, error, data: response } = await useAsyncData<Resource<User[]>>(
    'users',
    () => client('/api/users'),
    { lazy: true }
)

// DELETE USER
async function handleDeleteUser(userId: User['id']) {
    await client(`/api/users/${userId}`, {
        method: 'delete',
        onResponse(context) {
            if (!context.response.ok) return

            refreshNuxtData('users')
        }
    })
}
</script>

<template>
    <Main className="flex flex-col gap-y-8">
        <Header>Users</Header>
        <section class="flex flex-col gap-y-4">
            <Button to="/a/users/create" className="self-end">Create User</Button>
            <div class="overflow-x-scroll">
                <Table>
                    <template #thead>
                        <th>ID</th>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Email Verified</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </template>
                    <template #tbody>
                        <tr v-if="status === 'pending'">
                            <td colspan="7" class="text-center">loading...</td>
                        </tr>
                        <tr v-else-if="status === 'error'">
                            <td colspan="7" class="text-center">{{ error }}</td>
                        </tr>
                        <tr v-else-if="status === 'success' && response" v-for="user in response.data">
                            <td>{{ user.id }}</td>
                            <td>{{ user.role }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.emailVerifiedAt }}</td>
                            <td>{{ user.createdAt }}</td>
                            <td>{{ user.updatedAt }}</td>
                            <td>
                                <div class="flex gap-x-2">
                                    <Button :to="`/a/users/${user.id}/edit`">Edit</Button>
                                    <Button type="button" @click="handleDeleteUser(user.id)">Delete</Button>
                                </div>
                            </td>
                        </tr>
                    </template>
                </Table>
            </div>
        </section>
    </Main>
</template>