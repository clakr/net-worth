<script setup lang='ts'>
import type { Resource } from "~/utils/types";
import { UserRole, type User } from "~/utils/types/User";

definePageMeta({
	middleware: "guest",
	layout: "guest",
});

// LOGIN USER
const FORM_DEFAULT_STATE = {
	email: "test@admin.com",
	password: "password",
};
const form = reactive({ ...FORM_DEFAULT_STATE });
async function handleLoginUser() {
	const auth = useSanctumAuth<Resource<User>>();
	await auth.login({ ...form });

	if (!auth.user.value) return;

	const user = auth.user.value.data;
	switch (user.role) {
		case UserRole.ADMIN:
			await navigateTo("/a");
			break;

		default:
			await navigateTo("/u");
			break;
	}
}

// SWITCH USER ROLE **for dev only**
const role = ref<UserRole>(UserRole.ADMIN);
watch(
	() => role.value,
	(value) => {
		if (value === UserRole.ADMIN) {
			form.email = FORM_DEFAULT_STATE.email;
			form.password = FORM_DEFAULT_STATE.password;
		} else {
			form.email = "clarktolosa@gmail.com";
			form.password = "password";
		}
	},
);
</script>

<template>
	<Main>
		<form class="flex flex-col gap-y-2 *:gap-y-1" @submit.prevent="handleLoginUser">
			<FormField className="*:flex *:items-center *:gap-x-2">
				<div v-for="userRole in UserRole">
					<input type="radio" name="role" :id="userRole" :value="userRole" v-model="role" required>
					<Label :for="userRole">{{ capitalizeFirstLetter(userRole) }}</Label>
				</div>
			</FormField>
			<FormField>
				<Label for="email">Email</Label>
				<Input type="email" name="email" id="email" v-model="form.email" />
			</FormField>
			<FormField>
				<Label for="password">Password</Label>
				<Input type="password" name="password" id="password" v-model="form.password" />
			</FormField>
			<Button>Login</Button>
		</form>
	</Main>
</template>