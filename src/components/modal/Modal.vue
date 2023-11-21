<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
    dataToogle: string
}

const open = ref(false);

const toggleOpen = () => {
    console.log('click')
    open.value = !open.value
}

const { dataToogle } = defineProps<Props>()

onMounted(() => {
    setTimeout(() => {
        const buttons = document.querySelectorAll(`.${dataToogle}`);

        for (const button of buttons) {
            (button as HTMLElement).addEventListener('click', toggleOpen);
        }

        const button = document.getElementById(dataToogle);

        if (button) {
            const btn = button.querySelector(`.${dataToogle}`)
            if (btn) {
                (btn as HTMLElement).addEventListener('click', toggleOpen);
            }
        }
    }, 500)
})

</script>

<template>
    <div v-show="open" :class="$style.overlay">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" module>
.overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000a6;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>