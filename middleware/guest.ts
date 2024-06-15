export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useSanctumAuth();
	if (!auth.isAuthenticated.value) return;

	let endpoint = from.fullPath;
	if (from.fullPath === to.fullPath && from.fullPath === "/") {
		endpoint = "/register";
	} else if (from.fullPath === to.fullPath && from.fullPath === "/register") {
		endpoint = "/";
	}

	return navigateTo(endpoint, { replace: true });
});
