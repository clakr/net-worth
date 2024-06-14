<script setup lang='ts'>
import { definePageMeta, refreshNuxtData, useAsyncData, useSanctumClient } from '#imports';
import type { Resource } from '~/utils/types';
import type { Category } from '~/utils/types/Category';

definePageMeta({
    middleware: 'admin',
    layout: 'admin-aside'
})

// GET CATEGORIES
const client = useSanctumClient()
const { status, error, data: response } = useAsyncData<Resource<Category[]>>(
    'categories',
    () => client('/api/categories'),
    { lazy: true }
)

// DELETE CATEGORY
async function handleDeleteCategory(categoryId: Category['id']) {
    await client(`/api/categories/${categoryId}`, {
        method: 'delete',
        onResponse(context) {
            if (!context.response.ok) return

            refreshNuxtData('categories')
        }
    })
}
</script>

<template>
    <Main className="flex flex-col gap-y-8">
        <Header>Categories</Header>
        <section class="flex flex-col gap-y-4">
            <Button to="/a/categories/create" className="self-end">Create Category</Button>
            <Table>
                <template #thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th></th>
                </template>
                <template #tbody>
                    <tr v-if="status === 'pending'">
                        <td colspan="7" class="text-center">loading...</td>
                    </tr>
                    <tr v-else-if="status === 'error'">
                        <td colspan="7" class="text-center">{{ error }}</td>
                    </tr>
                    <tr v-else-if="status === 'success' && response" v-for="category in response.data">
                        <td>{{ category.id }}</td>
                        <td>{{ category.name }}</td>
                        <td>{{ category.createdAt }}</td>
                        <td>{{ category.updatedAt }}</td>
                        <td>
                            <div class="flex gap-x-2">
                                <Button variant="subtle" :to="`/a/categories/${category.id}/edit`">Edit</Button>
                                <Button variant="subtle" type="button"
                                    @click="handleDeleteCategory(category.id)">Delete</Button>
                            </div>
                        </td>
                    </tr>
                </template>
            </Table>
        </section>
    </Main>
</template>