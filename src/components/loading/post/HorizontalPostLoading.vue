<script setup lang="ts">
interface Props {
    size?: 'basic' | 'large';
}

const { size = 'basic' } = defineProps<Props>()
</script>

<template>
    <div :class="[$style.container, size === 'large' && $style.large]">
        <div class="skeleton" :class="$style.avatar"></div>
        <div :class="$style.lines">
            <div class="skeleton" :class="$style.cate"></div>
            <div :class="$style.title">
                <div class="skeleton"></div>
                <div class="skeleton"></div>
            </div>
            <div class="skeleton" :class="$style.line"></div>
            <div class="skeleton" :class="$style.line"></div>
            <div class="skeleton" :class="$style.line"></div>
            <div class="skeleton" :class="$style.line"></div>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    display: flex;
    gap: 10px;

    .avatar {
        width: 140px;
        aspect-ratio: 4/3;
        flex-shrink: 0;
    }

    .lines {
        flex: 1 1 100%;

        &>*+* {
            margin-top: 5px;
        }

        & :last-child {
            width: 50% !important;
        }

        .line {
            height: 14px;
            width: 100%;
        }
    }
}

.large {
    gap: 15px !important;

    .avatar {
        width: 245px !important;
    }

    .cate {
        height: 14px;
        width: 20%;
        margin-bottom: 10px;
    }

    .title {
        margin-bottom: 10px;

        & * {
            height: 20px;
            width: 100%;
        }

        &>*+* {
            margin-top: 5px;
        }

        &:last-child {
            width: 50% !important;
        }
    }
}
</style>