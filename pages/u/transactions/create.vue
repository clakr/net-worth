<script setup lang='ts'>
import { capitalizeFirstLetter, definePageMeta, navigateTo, reactive, useSanctumClient, useSanctumUser } from '#imports';
import type { Resource } from '~/utils/types';
import { TransactionType, type UserCreateTransactionCredentials, type UserCreateTransactionCredentialsErrors } from '~/utils/types/Transaction';
import type { User } from '~/utils/types/User';

definePageMeta({
    middleware: 'user',
    layout: 'user-aside'
})

// CREATE TRANSACTION
const formErrors = reactive<UserCreateTransactionCredentialsErrors>({
    type: [],
    name: [],
    description: [],
    amount: [],
    createdAt: []
})
const formData = reactive<UserCreateTransactionCredentials>({
    type: TransactionType.EXPENSE,
    name: '',
    description: '',
    amount: 1,
    createdAt: new Date(),
})
async function handleCreateTransaction() {
    const user = useSanctumUser<Resource<User>>()
    if (!user.value) return
    const userId = user.value.data.id

    const client = useSanctumClient()
    await client(`/api/users/${userId}/transactions`, {
        method: 'post',
        body: { ...formData },
        async onResponse(context) {
            if (!context.response.ok) return

            await navigateTo('/u/transactions')
        }
    }).catch((responseError) => {
        const errors = responseError.data.errors as typeof formErrors
        for (const error of Object.keys(errors)) {
            const key = error as keyof typeof formErrors
            formErrors[key] = errors[key]
        }
    })
}
</script>

<template>
    <Main className="flex flex-col gap-y-4">
        <Header>Create Transaction</Header>
        <form class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleCreateTransaction">
            <FormField className="*:flex *:items-center *:gap-x-2">
                <div v-for="transactionType in TransactionType">
                    <input type="radio" name="role" :id="transactionType" :value="transactionType"
                        v-model="formData.type" required>
                    <Label :for="transactionType">{{ capitalizeFirstLetter(transactionType) }}</Label>
                </div>
                <FormFieldErrors :list="formErrors.type" />
            </FormField>
            <FormField>
                <Label for="name">Name</Label>
                <Textarea name="name" id="name" v-model="formData.name" />
                <FormFieldErrors :list="formErrors.name" />
            </FormField>
            <FormField>
                <Label for="description">Description</Label>
                <Textarea name="description" id="description" v-model="formData.description" />
                <FormFieldErrors :list="formErrors.description" />
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
    </Main>
</template>