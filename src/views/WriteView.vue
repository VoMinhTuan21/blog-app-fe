<script setup lang="ts">
const basePath = import.meta.env.BASE_URL
</script>


<template>
    <div :class="[$style.container]">
        <input type="text" placeholder="Title" />
        <div :class="[$style.editor]">
            <button :class="[$style.button]">
                <img :src="`${basePath}plus.png`" width="24" />
            </button>
        </div>
    </div>
</template>

<style module>
.container {}

.editor {}

.button {}
</style>