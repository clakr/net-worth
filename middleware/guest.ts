import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import { useSanctumAuth } from "#imports";

export default defineNuxtRouteMiddleware((_, from) => {
	const auth = useSanctumAuth();
	if (!auth.isAuthenticated.value) return;

	return navigateTo(from.fullPath, { replace: true });
});
