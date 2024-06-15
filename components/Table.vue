<script setup lang='ts'>
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const props = withDefaults(defineProps<Props>(), {});

const classes = twMerge("overflow-x-scroll", props.className);
</script>

<template>
    <div :class="classes">
        <table class="w-full">
            <thead>
                <tr>
                    <slot name="thead" />
                </tr>
            </thead>
            <tbody class="[&>tr>td]:whitespace-pre [&>tr>td]:py-1 [&>tr>td]:px-3">
                <slot name="tbody" />
            </tbody>
        </table>
    </div>
</template>