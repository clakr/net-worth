<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const props = withDefaults(defineProps<Props>(), {});

const classes = twMerge("border-e border-primary-6 py-4 px-6", props.className);
</script>

<template>
    <aside :class="classes">
        <slot />
    </aside>
</template>