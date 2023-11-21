<script setup lang="ts">

</script>

<template>
    <div :class="$style.container">

        <div :class="$style.form__lef">
            <slot></slot>
        </div>
        <div :class="$style.form__right">
            <span>
                Vietnamnet - Báo điện tử chính thống hàng đầu Việt Nam
                <br>
                <i>&nbsp;</i>
            </span>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    max-width: 816px;
    min-height: 525px;
    display: flex;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    box-shadow: rgba(221, 221, 221, 0.6) 0 5px;

    .form {
        &__lef {
            width: 380px;
            padding: 40px 40px 30px;
            border-radius: 10px;
            min-height: 523px;
            background-color: white;
        }

        &__right {
            position: relative;
            width: calc(100% - 380px);
            background: url(https://account.vietnamnet.vn/icon/VnnId_anh.jpg) no-repeat scroll 0 0 transparent;

            span {
                width: 78%;
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                font-weight: 700;
                text-align: center;
                font-size: 18px;

                i {
                    width: 28%;
                    background-color: black;
                    height: 1px;
                    margin-top: 20px;
                    display: inline-block;
                }
            }
        }
    }
}
</style>