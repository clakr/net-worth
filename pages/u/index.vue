<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { NetWorth } from "~/utils/types/NetWorth";
import type { Transaction } from "~/utils/types/Transaction";
import type { User } from "~/utils/types/User";
import { Doughnut } from "vue-chartjs";

definePageMeta({
	middleware: "user",
	layout: "user-aside",
});

// DISPLAY DATA USING CHART
type ChartData = {
	labels: string[];
	datasets: {
		data: number[];
		backgroundColor?: string[];
	}[];
};
const chartData = ref<ChartData>({
	labels: [],
	datasets: [],
});
const chartOptions = ref({
	responsive: true,
	maintainAspectRatio: false,
});

// GET USER'S NETWORTH
const user = useSanctumUser<Resource<User>>();
const userId = user.value?.data.id;

type Data = [
	Resource<NetWorth & { transactions: Transaction[] }>,
	Resource<Record<string, number>>,
];

const client = useSanctumClient();
const {
	status,
	error,
	data: response,
} = useAsyncData<Data>(
	() =>
		Promise.all([
			client(`/api/users/${userId}/net-worth`),
			client("/api/transactions/sum", {
				onResponse({ response }) {
					if (!response._data) return;
					const { data } = response._data as Record<string, number>;

					chartData.value.labels = Object.keys(data);
					chartData.value.datasets = [
						{
							data: Object.values(data),
							backgroundColor: Object.values(colors).toReversed(),
						},
					];
				},
			}),
		]),
	{
		lazy: true,
		server: false,
	},
);
</script>

<template>
    <Main className="flex flex-col gap-y-8">
        <Header>Dashboard</Header>
        <p v-if="status === 'pending'">loading...</p>
        <p v-else-if="status === 'error'">{{ error }}</p>
        <template v-else-if="status === 'success' && response">
            <h2 class="text-5xl font-bold self-end">{{ formatToCurrency(response[0].data.amount) }}</h2>
            <section>
                <Doughnut :data="chartData" :options="chartOptions" />
            </section>
            <Table>
                <template #thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Created</th>
                    <th>Updated</th>
                </template>
                <template #tbody>
                    <tr v-if="!response[0].data.transactions.length">
                        <td colspan="7" class="text-center">no data found</td>
                    </tr>
                    <tr v-else v-for="transaction in response[0].data.transactions">
                        <td>{{ transaction.id }}</td>
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