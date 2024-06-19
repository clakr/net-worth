<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { Category } from "~/utils/types/Category";
import type { SubCategory } from "~/utils/types/SubCategory";
import type {
	UserCreateTransactionCredentials,
	UserCreateTransactionCredentialsErrors,
} from "~/utils/types/Transaction";
import type { User } from "~/utils/types/User";

definePageMeta({
	middleware: "user",
	layout: "user-aside",
});

// GET CATEGORIES & SUBCATEGORIES
const formErrors = reactive<UserCreateTransactionCredentialsErrors>({
	name: [],
	description: [],
	categoryId: [],
	subCategoryId: [],
	amount: [],
	createdAt: [],
});
const formData = reactive<UserCreateTransactionCredentials>({
	name: "",
	description: "",
	categoryId: 0,
	subCategoryId: 0,
	amount: 1,
	createdAt: new Date(),
});

type Data = [
	Resource<Category[]>,
	Resource<(SubCategory & { category: Category })[]>,
];

const client = useSanctumClient();
const {
	status,
	error,
	data: response,
} = useAsyncData<Data>(
	() =>
		Promise.all([
			client("/api/categories", {
				onResponse({ response }) {
					if (!response._data) return;

					const { data } = response._data as Resource<Category[]>;

					const firstCategory = data.at(0);
					if (!firstCategory) return;

					formData.categoryId = firstCategory.id;
				},
			}),
			client("/api/subcategories"),
		]),
	{
		lazy: true,
		server: false,
	},
);

// CREATE TRANSACTION
async function handleCreateTransaction() {
	const user = useSanctumUser<Resource<User>>();
	if (!user.value) return;
	const userId = user.value.data.id;

	await client(`/api/users/${userId}/transactions`, {
		method: "post",
		body: { ...formData },
		async onResponse(context) {
			if (!context.response.ok) return;

			await navigateTo("/u/transactions");
		},
	}).catch((responseError) => {
		const errors = responseError.data.errors as typeof formErrors;
		for (const error of Object.keys(errors)) {
			const key = error as keyof typeof formErrors;
			formErrors[key] = errors[key];
		}
	});
}

// FILTER SUBCATEGORIES BASED ON FORMDATA.CATEGORYID VALUE
const filteredSubCategories = computed(() =>
	response.value?.[1].data.filter(
		({ category }) => formData.categoryId === category.id,
	),
);
watch(
	() => filteredSubCategories.value,
	(value) => {
		if (!value) return;

		const firstSubCategory = value.at(0);
		if (!firstSubCategory) return;

		formData.subCategoryId = firstSubCategory.id;
	},
);
</script>

<template>
	<Main className="flex flex-col gap-y-4">
		<Header>Create Transaction</Header>
		<form v-if="status !== 'error'" class="flex flex-col gap-y-2 *:gap-y-1"
			@submit.prevent="handleCreateTransaction">
			<FormField>
				<Label for="name">Name</Label>
				<Textarea name="name" id="name" v-model="formData.name" required />
				<FormFieldErrors :list="formErrors.name" />
			</FormField>
			<FormField>
				<Label for="description">Description</Label>
				<Textarea name="description" id="description" v-model="formData.description" required />
				<FormFieldErrors :list="formErrors.description" />
			</FormField>
			<FormField v-if="response" className="grid grid-cols-2 gap-x-4 *:gap-y-1">
				<FormField>
					<Label for="category">Category</Label>
					<Select name="category" id="category" v-model="formData.categoryId">
						<option v-for="category in response[0].data" :value="category.id">
							{{ category.name }}
						</option>
					</Select>
					<FormFieldErrors :list="formErrors.categoryId" />
				</FormField>
				<FormField>
					<Label for="subcategory">Subcategory</Label>
					<Select name="subcategory" id="subcategory" v-model="formData.subCategoryId">
						<option v-for="subCategory in filteredSubCategories" :value="subCategory.id">
							{{ subCategory.name }}
						</option>
					</Select>
					<FormFieldErrors :list="formErrors.subCategoryId" />
				</FormField>
			</FormField>
			<FormField>
				<Label for="amount">Amount</Label>
				<Input type="number" name="amount" id="amount" min="0.01" step="0.01" v-model="formData.amount" />
				<FormFieldErrors :list="formErrors.amount" />
			</FormField>
			<FormField>
				<Label for="createdAt">Created</Label>
				<Input type="date" name="createdAt" id="createdAt" v-model="formData.createdAt" />
				<FormFieldErrors :list="formErrors.createdAt" />
			</FormField>
			<Button>Create</Button>
		</form>
		<p v-else>{{ error }}</p>
	</Main>
</template>