// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["nuxt-auth-sanctum", "@nuxtjs/tailwindcss"],
	sanctum: {
		baseUrl: process.env.BACKEND_URL,
		redirect: {
			onLogout: "/",
			onGuestOnly: "/a",
			onAuthOnly: "/",
		},
		endpoints: {
			user: "/api/auth",
		},
	},
	tailwindcss: {
		configPath: "tailwind.config",
	},
});
