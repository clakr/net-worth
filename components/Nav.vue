<script setup lang='ts'>
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string,
}

const props = withDefaults(defineProps<Props>(), {

})

const classes = twMerge(
    'border-b border-primary-6 py-4 px-6',
    props.className
)
</script>

<template>
    <nav :class="classes">
        <slot />
    </nav>
</template>