<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';

interface Props {
    count: number,
}

const { count } = defineProps<Props>()
const currentPage = ref(1);

const maxPageShowed = 5

const genArr = () => {
    const arr = createArray(count);
    let startIndex = 0;
    let endIndex = arr.length;

    const currentIndex = arr.findIndex(item => item === currentPage.value);

    if (currentIndex < maxPageShowed / 2) {
        startIndex = 0;
        endIndex = startIndex + maxPageShowed;
    } else if (currentIndex >= arr.length - 1 - maxPageShowed / 2) {
        endIndex = arr.length;
        startIndex = endIndex - maxPageShowed;
    } else {
        startIndex = currentIndex - Math.floor(maxPageShowed / 2);
        endIndex = startIndex + maxPageShowed;
    }

    return arr.slice(startIndex, endIndex);
}

const createArray = (endValue: number) => {
    const arr = [];
    for (let i = 1; i <= endValue; i++) {
        arr.push(i);
    }
    return arr;
}

const goForward = () => {
    if (currentPage.value < count) {
        currentPage.value += 1;
    }
}

const goBack = () => {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
}

const emit = defineEmits<{
    (e: 'page-change', page: number): void
}>()

watch(currentPage, () => {
    emit('page-change', currentPage.value)
})

</script>

<template>
    <div :class="$style.container">
        <div @click="goBack" :class="$style.button">
            <Icon width="20" height="20" icon="ep:arrow-left" />
        </div>
        <div v-for="item in genArr()" :class="[$style.button, item === currentPage && $style.active]"
            @click="() => { currentPage = item }">{{ item }}</div>
        <!-- <div :class="$style.button">2</div>
        <div :class="$style.button">3</div> -->
        <div @click="goForward" :class="$style.button">
            <Icon width="20" height="20" icon="ep:arrow-right" />
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    display: flex;
    align-items: center;
    column-gap: 10px;

    .button {
        width: 30px;
        height: 30px;
        border: 1px solid #a0a0a0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-size: 13px;
        color: #3e3e3e;
        cursor: pointer;

        &:hover {
            color: #447ec5;
        }
    }

    .active {
        border: none;
        background-color: #447ec5;
        color: white;

        &:hover {
            color: white !important;
        }
    }
}
</style>