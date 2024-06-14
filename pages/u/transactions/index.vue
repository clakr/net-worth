<script setup lang='ts'>
import { definePageMeta, formatToCurrency, useAsyncData, useSanctumClient, useSanctumUser } from '#imports';
import type { Resource } from '~/utils/types';
import type { Transaction } from '~/utils/types/Transaction';
import type { User } from '~/utils/types/User';

definePageMeta({
    middleware: 'user',
    layout: 'user-aside'
})

// GET USER'S TRANSACTIONS
const user = useSanctumUser<Resource<User>>()
const userId = user.value?.data.id

const client = useSanctumClient()
const { status, error, data: response } = useAsyncData<Resource<Transaction[]>>(
    () => client(`/api/users/${userId}/transactions`),
    { lazy: true }
)

</script>

<template>
    <Main class="flex flex-col gap-y-8">
        <Header>Transactions</Header>
        <section class="flex flex-col gap-y-4">
            <Button to="/u/transactions/create" className="self-end">Create Transaction</Button>
            <Table>
                <template #thead>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Created</th>
                    <th>Updated</th>
                </template>
                <template #tbody>
                    <tr v-if="status === 'pending'">
                        <td colspan="7" class="text-center">loading...</td>
                    </tr>
                    <tr v-else-if="status === 'error'">
                        <td colspan="7" class="text-center">{{ error }}</td>
                    </tr>
                    <tr v-else-if="status === 'success' && response" v-for="transaction in response.data">
                        <td>{{ transaction.id }}</td>
                        <td>{{ transaction.type }}</td>
                        <td>{{ transaction.name }}</td>
                        <td>{{ transaction.description }}</td>
                        <td>{{ transaction.category?.name }}</td>
                        <td>{{ formatToCurrency(transaction.amount) }}</td>
                        <td>{{ transaction.createdAt }}</td>
                        <td>{{ transaction.updatedAt }}</td>
                    </tr>
                </template>
            </Table>
        </section>
    </Main>
</template>