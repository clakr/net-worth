<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { Category } from "~/utils/types/Category";
import type {
	AdminEditSubCategoryCredentials,
	AdminEditSubCategoryCredentialsErrors,
	SubCategory,
} from "~/utils/types/SubCategory";

definePageMeta({
	middleware: "admin",
	layout: "admin-aside",
});

// GET INITIAL DATA (CATEGORIES AND SUBCATEGORY)
const route = useRoute();
const subCategoryId = route.params.subCategoryId;

const formErrors = reactive<AdminEditSubCategoryCredentialsErrors>({
	name: [],
	categoryId: [],
});
const formData = reactive<AdminEditSubCategoryCredentials>({
	name: "",
	categoryId: 0,
});

type Data = [
	Resource<Category[]>,
	Resource<SubCategory & { category: Category }>,
];

const client = useSanctumClient();
const {
	status,
	error,
	data: response,
} = await useAsyncData<Data>(
	() =>
		Promise.all([
			client("/api/categories"),
			client(`/api/subcategories/${subCategoryId}`, {
				onResponse({ response }) {
					if (!response._data) return;
					const { data } = response._data as Data[1];

					formData.name = data.name;
					formData.categoryId = data.category.id ?? 0;
				},
			}),
		]),
	{
		lazy: true,
		server: false,
	},
);

// EDIT SUBCATEGORY
async function handleEditSubCategory() {
	await client(`/api/subcategories/${subCategoryId}`, {
		method: "put",
		body: { ...formData },
		async onResponse(context) {
			if (!context.response.ok) return;

			await navigateTo("/a/subcategories");
		},
	}).catch((responseError) => {
		const errors = responseError.data.errors as typeof formErrors;
		for (const error of Object.keys(errors)) {
			const key = error as keyof typeof formErrors;
			formErrors[key] = errors[key];
		}
	});
}
</script>
<template>
	<Main className="flex flex-col gap-y-4">
		<Header>Edit Subcategory #{{ subCategoryId }}</Header>
		<form v-if="status !== 'error'" class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleEditSubCategory">
			<FormField>
				<Label for="category">Category</Label>
				<Select name="category" id="category" v-model="formData.categoryId">
					<option v-for="category in response?.[0].data" :value="category.id">
						{{ category.name }}
					</option>
				</Select>
				<FormFieldErrors :list="formErrors.categoryId" />
			</FormField>
			<FormField>
				<Label for="name">Name</Label>
				<Textarea name="name" id="name" v-model="formData.name" required />
				<FormFieldErrors :list="formErrors.name" />
			</FormField>
			<Button>Edit</Button>
		</form>
		<p v-else>{{ error }}</p>
	</Main>
</template>