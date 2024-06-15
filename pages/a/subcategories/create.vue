<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { Category } from "~/utils/types/Category";
import type {
	AdminCreateSubCategoryCredentials,
	AdminCreateSubCategoryCredentialsErrors,
} from "~/utils/types/SubCategory";

definePageMeta({
	middleware: "admin",
	layout: "admin-aside",
});

// GET CATEGORIES
const formErrors = reactive<AdminCreateSubCategoryCredentialsErrors>({
	name: [],
	categoryId: [],
});
const formData = reactive<AdminCreateSubCategoryCredentials>({
	name: "",
	categoryId: 0,
});

const client = useSanctumClient();
const {
	status,
	error,
	data: response,
} = await useAsyncData<Resource<Category[]>>(
	() =>
		client("/api/categories", {
			onResponse({ response }) {
				if (!response._data) return;
				const { data } = response._data as Resource<Category[]>;

				const firstCategory = data.at(0);
				if (!firstCategory) return;

				formData.categoryId = firstCategory.id;
			},
		}),
	{
		lazy: true,
		server: false,
	},
);

// CREATE SUBCATEGORY
async function handleCreateSubCategory() {
	await client("/api/subcategories", {
		method: "post",
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
		<Header>Create Subcategory</Header>
		<form v-if="status !== 'error'" class="flex flex-col gap-y-2 *:gap-y-1"
			@submit.prevent="handleCreateSubCategory">
			<FormField>
				<Label for="category">Category</Label>
				<Select name="category" id="category" v-model="formData.categoryId">
					<option v-for="category in response?.data" :value="category.id">
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
			<Button>Create</Button>
		</form>
		<p v-else>{{ error }}</p>
	</Main>
</template>