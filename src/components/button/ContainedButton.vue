<script setup lang="ts">
interface Props {
    type?: 'button' | 'submit' | 'reset'
}

const { type = 'button' } = defineProps<Props>()

</script>

<template>
    <button :type="type" :class="$style.container">
        <slot></slot>
    </button>
</template>

<style lang="scss" module>
.container {
    background-color: #447ec5;
    border-radius: 8px;
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: 'Noto Sans';
    width: 100%;
    line-height: 40px;
}
</style>