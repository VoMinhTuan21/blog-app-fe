<script setup lang="ts">

</script>

<template>
    <div>
        <div :class="$style.title">
            <div class="skeleton"></div>
        </div>
        <div :class="$style['first-story']">
            <div class="skeleton" :class="$style['first-story__avatar']"></div>
            <div :class="$style['first-story__title']">
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
            </div>
        </div>
        <div class="skeleton" :class="$style['other-story']"></div>
        <div class="skeleton" :class="$style['other-story']"></div>
        <div class="skeleton" :class="$style['other-story']"></div>
        <div class="skeleton" :class="$style['other-story']"></div>
    </div>
</template>

<style module lang="scss">
.title {
    div {
        height: 24px;
        width: 30%;
    }

    padding-bottom: 5px;
    border-bottom: 1px solid #add2ff;
    margin-bottom: 15px;
}

.first-story {
    display: flex;
    gap: 10px;

    &__avatar {
        width: 140px;
        aspect-ratio: 4/3;
        flex-shrink: 0;
    }

    &__title {
        flex: 1 1 100%;

        &>*+* {
            margin-top: 5px;
        }

        div {
            height: 12px;
            width: 100%;
        }

        & :last-child {
            width: 50%;
        }
    }
}

.other-story {
    height: 20px;
    width: 100%;
    margin-top: 15px;
}
</style>