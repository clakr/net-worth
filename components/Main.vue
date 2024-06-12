<script setup lang='ts'>
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string,
}

const props = withDefaults(defineProps<Props>(), {

})

const classes = twMerge(
    'py-4 px-6',
    props.className
)
</script>

<template>
    <main :class="classes">
        <slot />
    </main>
</template>