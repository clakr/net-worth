<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const model = defineModel();
const props = withDefaults(defineProps<Props>(), {});

const classes = twMerge(
	"border border-primary-6 py-2 px-3 rounded text-primary-12",
	"focus:outline-primary-8",
	props.className,
);
</script>

<template>
	<input v-model="model" :class="classes" />
</template>