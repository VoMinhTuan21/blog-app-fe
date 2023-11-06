<script setup lang="ts">
import { ref, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import { useUser } from '../stores/user';
import { useRouter } from 'vue-router';

const basePath = import.meta.env.BASE_URL;

const open = ref(false);
const value = ref('');
</script>


<template>
    <div :class="[$style.container]">
        <input :class="[$style.input]" type="text" placeholder="Title" />
        <div :class="[$style.editor]">
            <button :class="[$style.button]" @click="() => { open = !open }">
                <img :src="`${basePath}plus.png`" alt="icon" width="16" height="16" />
            </button>
            <div v-if="open" :class="[$style.add]">
                <button :class="[$style.addButton]">
                    <img :src="`${basePath}image.png`" alt="icon" width="16" height="16" />
                </button>
                <button :class="[$style.addButton]">
                    <img :src="`${basePath}external.png`" alt="icon" width="16" height="16" />
                </button>
                <button :class="[$style.addButton]">
                    <img :src="`${basePath}video.png`" alt="icon" width="16" height="16" />
                </button>
            </div>
            <QuillEditor :class="[$style.textArea]" theme="bubble" v-model:content="value"
                placeholder="Tell your story..." />
        </div>
        <button :class="[$style.publish]">Publish</button>
    </div>
</template>

<style module>
.container {}

.input {
    padding: 50px;
    font-size: 64px;
    border: none;
    outline: none;
    background-color: transparent;
}

.input::placeholder {
    color: #b3b3b1;
}

.editor {
    display: flex;
    gap: 20px;
    height: 700px;
    position: relative;
}

.add {
    display: flex;
    gap: 20px;
    background-color: var(--bg);
    position: absolute;
    z-index: 999;
    width: 100%;
    left: 50px;
}

.button,
.addButton {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid var(--textColor);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
}

.addButton {
    border-color: #1a8917;
}

.textArea {
    width: 100%;
}

.publish {
    position: absolute;
    top: 30px;
    right: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #1a8917;
    color: white;
    cursor: pointer;
    border-radius: 20px;
}
</style>