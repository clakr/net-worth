<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const props = withDefaults(defineProps<Props>(), {});

const classes = twMerge("flex flex-col", props.className);
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>