<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

const model = defineModel();

type Props = {
	className?: string;
};

const props = withDefaults(defineProps<Props>(), {});

const classes = twMerge(
	"border border-primary-6 py-2 px-3 rounded text-priamary-12",
	"focus:outline-primary-8",
	props.className,
);
</script>

<template>
	<select :class="classes" v-model="model">
		<slot />
	</select>
</template>