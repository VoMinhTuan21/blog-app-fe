<script setup lang="ts">
interface Props {
    size?: 'base' | 'large'
}

const { size } = defineProps<Props>();
</script>

<template>
    <div :class="[$style.container, size === 'large' && $style.large]">
        <div class="skeleton" :class="$style.avatar"></div>
        <div :class="$style.title">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        </div>
        <div v-if="size === 'large'" :class="$style.desc">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    flex-shrink: 0;
    flex: 1;

    .avatar {
        width: 100%;
        aspect-ratio: 4/2;
        margin-bottom: 15px;
    }

    .title {
        & * {
            height: 20px;
            width: 100%;
        }

        &>*+* {
            margin-top: 5px;
        }

        & :last-child {
            width: 50%;
        }
    }
}

.large {
    .desc {
        margin-top: 10px;

        & * {
            height: 14px;
            width: 100%;
        }

        &>*+* {
            margin-top: 5px;
        }

        & :last-child {
            width: 50%;
        }
    }
}
</style>