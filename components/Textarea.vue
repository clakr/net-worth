<script setup lang='ts'>
import { twMerge } from 'tailwind-merge'

const model = defineModel()

type Props = {
    className?: string,

}

const props = withDefaults(defineProps<Props>(), {

})

const classes = twMerge(
    'border border-primary-6 py-1 px-3 rounded text-primary-12',
    'focus:outline-primary-8',
    props.className
)
</script>

<template>
    <textarea :class="classes" v-model="model">
    </textarea>
</template>