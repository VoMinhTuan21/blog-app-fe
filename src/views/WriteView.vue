<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Quill, QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useUser } from '../stores/user';
import QuillBlotFormatter from 'quill-blot-formatter';
import { uid } from 'uid';
import { convertBase64ToBlob } from '../utils/image'
import PostRepository from '../repositories/postRepository'
import { useCategory } from '../stores/category';
import Select from '../components/Select.vue'
import type { Option } from '../types/global';
import { Icon } from '@iconify/vue';
import { toast } from '@steveyuowo/vue-hot-toast';

Quill.register('modules/blotFormatter', QuillBlotFormatter);

const categoryStore = useCategory();
const userStore = useUser()

const title = ref('')
const value = ref('');
const mainDesc = ref('');
const editor = ref()
const category = ref<Option | null>(null)
const thumbnail = ref<File | null>(null)

const onSubmit = async () => {
    try {
        const toastId = toast.loading("Creating post...")
        const placeholder = document.createElement("div");
        placeholder.innerHTML = value.value;
        const images = placeholder.querySelectorAll('img')

        const formData = new FormData()

        for (const image of images) {
            const id = uid()
            image.setAttribute('id', id)
            const base64ImageData = image.getAttribute('src');
            if (base64ImageData) {
                const { blob, format } = convertBase64ToBlob(base64ImageData)
                formData.append('images', blob, `${id}.${format}`);
            }
            image.setAttribute('src', '')
        }

        formData.append('mainDesc', mainDesc.value)
        formData.append('desc', placeholder.innerHTML.toString())
        formData.append('title', title.value);
        if (thumbnail.value) {
            formData.append('thumbnail', thumbnail.value)
        }

        if (category.value) {
            formData.append('categoryId', category.value.value)
        }

        formData.append('userId', userStore.user.id)

        await PostRepository.create(formData)

        resetForm();

        toast.update(toastId, {
            type: "success",
            message: "Create post success 🎉"
        });

    } catch (error) {
        console.log("error: ", error);
        toast.error("Create post failed")
    }
}

const createThumbnailURL = () => {
    if (thumbnail.value) {
        return URL.createObjectURL(thumbnail.value)
    }
    return ""
}

const clearThumbnail = () => {
    thumbnail.value = null;
}

const resetForm = () => {
    thumbnail.value = null;
    title.value = '';
    value.value = '';
    editor.value.setText('');
    mainDesc.value = '';
}

const getHTML = () => {
    const editor = document.querySelector('.ql-editor');
    if (editor) {
        console.log("editor.innerHTML: ", editor.innerHTML);
    }
}

</script>


<template>
    <div :class="$style.container">
        <div :class="[$style.header]">
            <textarea v-model="title" :class="[$style.input]" type="text" placeholder="Title" />
            <div :class="[$style.thumbnail]">
                <template v-if="!thumbnail">
                    <p>Upload an image</p>
                    <button :class="[$style.upload]">
                        <label for="image">Choose file</label>
                    </button>
                </template>
                <template v-else>
                    <div :class="$style.overlay">
                        <button @click="clearThumbnail" :class="$style.close">
                            Clear image
                        </button>
                    </div>
                    <img :src="createThumbnailURL()" />
                </template>
                <input id="image" accept="image/*" type="file" @change="(e) => {
                    if (e.target) {
                        const target = e.target as HTMLInputElement;
                        if (target.files) {
                            thumbnail = target.files[0]
                        }
                    }
                }" hidden>
            </div>
        </div>

        <Select @on-change="(value) => { category = value }"
            :options="categoryStore.categories.map(cat => ({ label: cat.title, value: cat.id }))" />

        <textarea v-model="mainDesc" :class="$style['main-desc']" placeholder="Nội dung chính" />

        <div :class="[$style.editor]">
            <QuillEditor ref="editor" :class="[$style.textArea]" content-type="html" theme="snow" toolbar="full"
                v-model:content="value" placeholder="Tell your story..." />
        </div>

        <div :class="$style['flex-end']">
            <button :class="[$style.publish]" @click="onSubmit">Publish</button>
        </div>
    </div>
</template>

<style lang="scss" module>
.container {
    max-width: 1140px;
    margin: 0 auto;
    margin-top: 20px;

    &>*+* {
        margin-top: 20px;
    }
}

.header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    height: 200px;
}

.thumbnail {
    flex: 1;
    border: 1px dashed #e2e2e2;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    justify-content: center;
    position: relative;
}

.thumbnail img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}

.thumbnail .close {
    background-color: var(--softTextColor);
    color: var(--softBg);
    padding: 8px 16px;
    border-radius: 20px;
    position: absolute;
    border: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.thumbnail:hover .close {
    visibility: unset;
}

.thumbnail .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.5);
    opacity: 0;
    transition: opacity 0.5s ease;
}

.thumbnail:hover .overlay {
    opacity: 1;
}

.upload {
    padding: 10px 20px;
    border: none;
    background-color: #447ec5;
    color: white;
    cursor: pointer;
    font-family: 'Noto Sans';
    font-size: 16px;
}

.input {
    flex: 1;
    padding: 20px;
    font-size: 32px;
    border: none;
    outline: none;
    height: 100%;
    background-color: transparent;
    resize: none;
    font-family: 'Noto Sans';
}

.input::placeholder {
    color: #b3b3b1;
}

.editor {
    position: relative;
}

.textArea {
    width: 100%;
}

.main-desc {
    width: 100%;
    border: 1px solid #e2e2e2;
    font-size: 16px;
    padding: 12px 15px;
    font-family: "Noto Sans";
    outline: none;
    resize: none;

    &::placeholder {
        color: #b3b3b1;
    }
}

.publish {
    padding: 10px 20px;
    border: none;
    background-color: #447ec5;
    color: white;
    cursor: pointer;
    font-family: 'Noto Sans';
    font-size: 16px;
}

.flex-end {

    display: flex;
    justify-content: flex-end;
}
</style>