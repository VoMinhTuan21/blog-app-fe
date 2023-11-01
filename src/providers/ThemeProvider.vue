<script setup lang="ts">
import { inject } from 'vue';
import { ThemeKey } from '../symbols'
import type { Theme } from "../types"

const { value } = inject(ThemeKey) as Theme
</script>

<template>
    <div :class="[value]">
        <slot></slot>
    </div>
</template>