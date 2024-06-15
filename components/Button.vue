<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

type Variant = "filled" | "subtle";

type Props = {
	className?: string;
	to?: string;
	variant?: Variant;
};

const props = withDefaults(defineProps<Props>(), {
	variant: "filled",
});

const variant: Record<Variant, string> = {
	filled:
		"bg-primary-9 text-primary-1 hover:bg-primary-10 focus:outline-offset-4",
	subtle: "bg-transparent text-primary-9 hover:bg-primary-3",
};

const classes = twMerge(
	"py-1.5 px-3 rounded font-medium whitespace-pre",
	"focus:outline-primary-8",
	variant[props.variant],
	props.className,
);
</script>

<template>
	<NuxtLink v-if="to" :to :class="classes">
		<slot />
	</NuxtLink>
	<button v-else :class="classes">
		<slot />
	</button>
</template>