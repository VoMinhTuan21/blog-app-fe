<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import { Icon } from '@iconify/vue';
import type { Option } from '../types/global';

interface Props {
    options: Option[],
    default?: Option
}

const props = defineProps<Props>()

const selected = ref(props.default ? props.default : (props.options.length > 0 ? props.options[0] : null))

const optionsContainer = ref<HTMLDivElement | null>(null)
const selectedContainer = ref<HTMLDivElement | null>(null)

const open = ref(false);

const emit = defineEmits<{ (e: 'on-change', value: Option | null): void }>()

onMounted(() => {
    if (optionsContainer.value && selectedContainer.value) {
        optionsContainer.value.style.setProperty('width', selectedContainer.value.offsetWidth + 'px')
    }

    emit('on-change', selected.value)
})

watchEffect(() => {
    emit('on-change', selected.value)
})

watchEffect(() => {
    if (open.value === true && optionsContainer.value && selectedContainer.value) {
        const region = optionsContainer.value.getBoundingClientRect();
        const offset = window.innerHeight - region.bottom;

        if (offset < 30) {
            optionsContainer.value.style.bottom = selectedContainer.value.getBoundingClientRect().height + 20 + 'px'
            optionsContainer.value.style.top = "auto"
        } else {
            optionsContainer.value.style.top = '100%'
            optionsContainer.value.style.bottom = 'auto'
        }
    }
})

const handleClick = (value: {
    label: string,
    value: string
}) => {
    selected.value = value
    open.value = false
}

</script>

<template>
    <div :class="$style.container">
        <div ref="selectedContainer" @click="() => { open = !open }" :class="$style.selected">
            <p>{{ selected?.label }}</p>
            <Icon :class="[$style.icon, open && $style.rotate]" icon="mingcute:down-line" />
        </div>

        <div ref="optionsContainer" :class="[$style.options, !open && $style.hidden]">
            <p :class="$style.item" v-for="o in options" @click="() => handleClick(o)">{{ o.label }}</p>
        </div>
    </div>
</template>

<style module>
.container {
    position: relative;
    padding-bottom: 10px;
}

.selected,
.options {
    border: 1px solid #e2e2e2;
    padding: 12px 16px;
}

.selected {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon {
    transition: all ease-in-out;
    transform: rotate(0);
    transition-duration: 300ms;

}

.rotate {
    transform: rotate(180deg);
}

.options {
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: 200px;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    z-index: 20;
}

.options .item {
    padding: 12px;
    cursor: pointer;
}

.options .item:hover {
    background-color: #c2bfbf;
    color: white;
}

.hidden {
    visibility: hidden;
}
</style>