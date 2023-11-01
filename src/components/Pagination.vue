<template>
    <div :class="[$style.container]">
        <button :class="[$style.button]">Previous</button>
        <button :class="[$style.button]">Next</button>
    </div>
</template>

<script setup lang="ts">

</script>

<style module>
.container {
    display: flex;
    justify-content: space-between;
}

.button {
    width: 100px;
    border: none;
    padding: 16px;
    background-color: crimson;
    color: white;
    cursor: pointer;
}
</style>