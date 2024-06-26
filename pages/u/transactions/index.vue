<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { SubCategory } from "~/utils/types/SubCategory";
import type { Transaction } from "~/utils/types/Transaction";

definePageMeta({
	middleware: "user",
	layout: "user-aside",
});

// GET USER'S TRANSACTIONS
type Data = Resource<(Transaction & { subCategory: SubCategory })[]>;
const client = useSanctumClient();
const {
	status,
	error,
	data: response,
} = useAsyncData<Data>(() => client("/api/transactions"), { lazy: true });
</script>

<template>
    <Main class="flex flex-col gap-y-8">
        <Header>Transactions</Header>
        <section class="flex flex-col gap-y-4">
            <Button to="/u/transactions/create" className="self-end">Create Transaction</Button>
            <Table>
                <template #thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Subcategory</th>
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
                    <template v-else-if="status === 'success' && response">
                        <tr v-if="!response.data.length">
                            <td colspan="7" class="text-center">no data found</td>
                        </tr>
                        <tr v-else v-for="transaction in response.data">
                            <td>{{ transaction.id }}</td>
                            <td>{{ transaction.name }}</td>
                            <td>{{ transaction.description }}</td>
                            <td>{{ transaction.subCategory.name }}</td>
                            <td>{{ formatToCurrency(transaction.amount) }}</td>
                            <td>{{ transaction.createdAt }}</td>
                            <td>{{ transaction.updatedAt }}</td>
                        </tr>
                    </template>
                </template>
            </Table>
        </section>
    </Main>
</template>