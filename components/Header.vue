<script setup lang='ts'>
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string,
}

const props = withDefaults(defineProps<Props>(), {

})

const classes = twMerge(
    'text-5xl font-medium',
    props.className
)
</script>

<template>
    <h1 :class="classes">
        <slot />
    </h1>
</template>