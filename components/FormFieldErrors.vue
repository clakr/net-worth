<script setup lang='ts'>
import { twMerge } from 'tailwind-merge'

type Props = {
    className?: string,
    list: string[]
}

const props = withDefaults(defineProps<Props>(), {

})

const classes = twMerge(
    'list-disc list-inside font-medium text-red-500',
    props.className
)
</script>

<template>
    <ul v-if="list" :class="classes">
        <li v-for="item in list">{{ item }}</li>
    </ul>
</template>