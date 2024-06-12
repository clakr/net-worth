<script setup lang='ts'>
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string,
}

const props = withDefaults(defineProps<Props>(), {

})

const classes = twMerge(
    'text-grass-12 font-medium',
    props.className
)
</script>

<template>
    <label :class="classes">
        <slot />
    </label>
</template>