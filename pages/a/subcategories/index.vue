<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import type { Category } from "~/utils/types/Category";
import type { SubCategory } from "~/utils/types/SubCategory";

definePageMeta({
	middleware: "admin",
	layout: "admin-aside",
});

// GET SUBCATEGORIES
type Data = Resource<(SubCategory & { category: Category })[]>;

const client = useSanctumClient();
const {
	status,
	error,
	data: response,
} = await useAsyncData<Data>(
	"subcategories",
	() => client("/api/subcategories"),
	{ lazy: true },
);

// DELETE SUBCATEGORY
async function handleDeleteSubCategory(subCategoryId: SubCategory["id"]) {
	await client(`/api/subcategories/${subCategoryId}`, {
		method: "delete",
		onResponse(context) {
			if (!context.response.ok) return;

			refreshNuxtData("subcategories");
		},
	});
}
</script>
<template>
    <Main className="flex flex-col gap-y-8">
        <Header>Subcategories</Header>
        <section class="flex flex-col gap-y-4">
            <Button to="/a/subcategories/create" className="self-end">Create Subcategory</Button>
            <Table>
                <template #thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
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
                        <tr v-else v-for="subcategory in response.data">
                            <td>{{ subcategory.id }}</td>
                            <td>{{ subcategory.name }}</td>
                            <td>{{ subcategory.category.name }}</td>
                            <td>{{ subcategory.createdAt }}</td>
                            <td>{{ subcategory.updatedAt }}</td>
                            <td>
                                <div class="flex gap-x-2">
                                    <Button variant="subtle"
                                        :to="`/a/subcategories/${subcategory.id}/edit`">Edit</Button>
                                    <Button variant="subtle" type="button"
                                        @click="handleDeleteSubCategory(subcategory.id)">Delete</Button>
                                </div>
                            </td>
                        </tr>
                    </template>
                </template>
            </Table>
        </section>
    </Main>
</template>