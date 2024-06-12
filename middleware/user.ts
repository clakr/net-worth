import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSanctumAuth } from "#imports";
import type { Resource } from "~/utils/types";
import { UserRole, type User } from "~/utils/types/User";

export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useSanctumAuth<Resource<User>>();
	if (
		auth.isAuthenticated.value &&
		auth.user.value?.data.role === UserRole.USER
	)
		return;

	let endpoint = from.fullPath;
	if (to.fullPath === from.fullPath) {
		endpoint = "/";
	}

	return navigateTo(endpoint, { replace: true });
});
