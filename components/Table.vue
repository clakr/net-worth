<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const props = withDefaults(defineProps<Props>(), {});

const classes = twMerge("overflow-x-scroll text-sm", props.className);
</script>

<template>
    <div :class="classes">
        <table class="w-full">
            <thead class="border-b border-primary-6">
                <tr class="[&>th]:p-4 [&>th]:text-start">
                    <slot name="thead" />
                </tr>
            </thead>
            <tbody class="[&>tr>td]:whitespace-pre [&>tr>td]:p-4 even:[&>tr]:bg-primary-2">
                <slot name="tbody" />
            </tbody>
        </table>
    </div>
</template>