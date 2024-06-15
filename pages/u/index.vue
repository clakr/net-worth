<script setup lang='ts'>
import { definePageMeta, useAsyncData, useSanctumClient, useSanctumUser } from '#imports';
import formatToCurrency from '~/composables/formatToCurrency';
import type { Resource } from '~/utils/types';
import type { NetWorth } from '~/utils/types/NetWorth';
import type { User } from '~/utils/types/User';

definePageMeta({
    middleware: 'user',
    layout: 'user-aside'
})

// GET'S USER NETWORTH
const user = useSanctumUser<Resource<User>>()
const userId = user.value?.data.id

const client = useSanctumClient()
const { status, error, data: response } = useAsyncData<Resource<NetWorth>>(
    () => client(`/api/users/${userId}/net-worth`),
    { lazy: true }
)
</script>

<template>
    <Main className="flex flex-col gap-y-8">
        <Header>Dashboard</Header>
        <p v-if="status === 'pending'">loading...</p>
        <p v-else-if="status === 'error'">{{ error }}</p>
        <template v-else-if="status === 'success' && response">
            <h2 class="text-5xl font-bold self-end">{{ formatToCurrency(response.data.amount) }}</h2>
            <Table>
                <template #thead>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Created</th>
                    <th>Updated</th>
                </template>
                <template #tbody>
                    <tr v-if="!response.data.transactions?.length">
                        <td colspan="7" class="text-center">no data found</td>
                    </tr>
                    <tr v-else v-for="transaction in response.data.transactions">
                        <td>{{ transaction.id }}</td>
                        <td>{{ transaction.type }}</td>
                        <td>{{ transaction.name }}</td>
                        <td>{{ transaction.description }}</td>
                        <td>{{ formatToCurrency(transaction.amount) }}</td>
                        <td>{{ transaction.createdAt }}</td>
                        <td>{{ transaction.updatedAt }}</td>
                    </tr>
                </template>
            </Table>
        </template>
    </Main>
</template>