<script setup lang="ts">

</script>

<template>
    <div :class="$style.container">
        <div class="skeleton" :class="$style.avatar"></div>
        <div :class="$style['conmment-info']">
            <div class="skeleton" :class="[$style.line, $style.name]"></div>
            <div class="skeleton" :class="[$style.line]"></div>
            <div>
                <div :class="$style.action" class="skeleton"></div>
                <div :class="$style.action" class="skeleton"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    display: flex;
    gap: 5px;

    .avatar {
        width: 32px;
        height: 32px;
        flex-shrink: 0;
        border-radius: 50%;
    }

    .conmment-info {
        flex: 1 1 100%;

        &>*+* {
            margin-top: 10px;
        }

        .line {
            height: 12px;
            width: 100%;
        }

        .name {
            width: 200px;
        }

        .action {
            height: 12px;
            width: 100px;
            display: inline-block;
            margin-right: 10px;
        }
    }
}
</style>