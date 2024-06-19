<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import {
	CategoryType,
	type AdminEditCategoryCredentials,
	type AdminEditCategoryCredentialsErrors,
	type Category,
} from "~/utils/types/Category";

definePageMeta({
	middleware: "admin",
	layout: "admin-aside",
});

// GET CATEGORY
const route = useRoute();
const categoryId = route.params.categoryId;

const formErrors = reactive<AdminEditCategoryCredentialsErrors>({
	type: [],
	name: [],
});
const formData = reactive<AdminEditCategoryCredentials>({
	type: CategoryType.EXPENSE,
	name: "",
});

const client = useSanctumClient();
const { status, error } = await useAsyncData<Resource<Category>>(
	() =>
		client(`/api/categories/${categoryId}`, {
			onResponse({ response }) {
				if (!response._data) return;
				const { data } = response._data as Resource<Category>;

				formData.type = data.type;
				formData.name = data.name;
			},
		}),
	{
		lazy: true,
		server: false,
	},
);

// EDIT CATEGORY
async function handleEditCategory() {
	await client(`/api/categories/${categoryId}`, {
		method: "put",
		body: { ...formData },
		async onResponse(context) {
			if (!context.response.ok) return;

			await navigateTo("/a/categories");
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
		<Header>Edit Category #{{ categoryId }}</Header>
		<form v-if="status !== 'error'" class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleEditCategory">
			<FormField className="*:flex *:items-center *:gap-x-2">
				<div v-for="categoryType in CategoryType">
					<input type="radio" name="role" :id="categoryType" :value="categoryType" v-model="formData.type"
						required>
					<Label :for="categoryType">{{ capitalizeFirstLetter(categoryType) }}</Label>
				</div>
				<FormFieldErrors :list="formErrors.type" />
			</FormField>
			<FormField>
				<Label for="name">Name</Label>
				<Input type="text" name="name" id="name" v-model="formData.name" required />
				<FormFieldErrors :list="formErrors.name" />
			</FormField>
			<Button>Edit</Button>
		</form>
		<p v-else>{{ error }}</p>
	</Main>
</template>