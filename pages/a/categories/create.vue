<script setup lang='ts'>
import {
	CategoryType,
	type AdminCreateCategoryCredentials,
	type AdminCreateCategoryCredentialsErrors,
} from "~/utils/types/Category";

definePageMeta({
	middleware: "admin",
	layout: "admin-aside",
});

// CREATE CATEGORY
const formErrors = reactive<AdminCreateCategoryCredentialsErrors>({
	type: [],
	name: [],
});
const formData = reactive<AdminCreateCategoryCredentials>({
	type: CategoryType.EXPENSE,
	name: "",
});
async function handleCreateCategory() {
	const client = useSanctumClient();
	await client("/api/categories", {
		method: "post",
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
		<Header>Create Category</Header>
		<form class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleCreateCategory">
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
				<Input type="text" name="name" id="name" v-model="formData.name" />
				<FormFieldErrors :list="formErrors.name" />
			</FormField>
			<Button>Create</Button>
		</form>
	</Main>
</template>