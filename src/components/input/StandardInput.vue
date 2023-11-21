<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref, toRef } from "vue";
import { useField } from "vee-validate";

interface Props {
    type: "text" | "password";
    placeholder?: string;
    modelValue: string;
    error?: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue", "blur"]);

const showPass = ref(false);

const toggleShowPass = () => {
    showPass.value = !showPass.value;
};
</script>

<template>
    <div>
        <div :class="$style.container">
            <input :value="modelValue" @input="(e: Event) => {
                emit('update:modelValue', (e.target as HTMLInputElement).value)
            }" @blur="$emit('blur')" :placeholder="props.placeholder" :type="!showPass ? props.type : 'text'" />
            <slot></slot>

            <Icon :class="$style['cusor-pointer']" @click="toggleShowPass" v-if="props.type === 'password' && !showPass"
                icon="octicon:eye-16" />
            <Icon :class="$style['cusor-pointer']" @click="toggleShowPass" v-if="props.type === 'password' && showPass"
                icon="mdi:eye-off-outline" />
        </div>
        <p :class="$style['help-message']" v-show="error">
            {{ error }}
        </p>
    </div>
</template>

<style module lang="scss">
.container {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;

    input {
        border: none;
        outline: none;
        padding: 10px 0 12px 10px;
        font-size: 12px;
        flex-grow: 1;
    }

    & :last-child {
        color: #c0c0c0;
        margin-right: 10px;
    }
}

.cusor-pointer {
    cursor: pointer;
}

.help-message {
    color: red;
    font-size: 12px;
    line-height: 16px;
    margin-top: 5px;
}
</style>
