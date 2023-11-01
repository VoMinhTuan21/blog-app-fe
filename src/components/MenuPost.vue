<script setup lang="ts">
const basePath = import.meta.env.BASE_URL

const props = defineProps({
    withImage: {
        type: Boolean,
        required: true
    }
})
</script>

<template>
    <div :class="[$style.items]">
        <a href="/" :class="[$style.item]">
            <div v-if="withImage" :class="[$style.imageContainer]">
                <img :src="`${basePath}p1.jpeg`" alt="image" :class="[$style.image]" />
            </div>
            <div :class="[$style.textContainer]">
                <span :class="[$style.category, $style.travel]">Travel</span>
                <h3 :class="[$style.postTitle]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                <div :class="[$style.detail]">
                    <span :class="[$style.username]">John Doe</span>
                    <span :class="[$style.date]"> - 10.03.2023</span>
                </div>
            </div>
        </a>
        <a href="/" :class="[$style.item]">
            <div v-if="withImage" :class="[$style.imageContainer]">
                <img :src="`${basePath}p1.jpeg`" alt="image" :class="[$style.image]" />
            </div>
            <div :class="[$style.textContainer]">
                <span :class="[$style.category, $style.culture]">Culture</span>
                <h3 :class="[$style.postTitle]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                <div :class="[$style.detail]">
                    <span :class="[$style.username]">John Doe</span>
                    <span :class="[$style.date]"> - 10.03.2023</span>
                </div>
            </div>
        </a>
        <a href="/" :class="[$style.item]">
            <div v-if="withImage" :class="[$style.imageContainer]">
                <img :src="`${basePath}p1.jpeg`" alt="image" :class="[$style.image]" />
            </div>
            <div :class="[$style.textContainer]">
                <span :class="[$style.category, $style.food]">Food</span>
                <h3 :class="[$style.postTitle]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                <div :class="[$style.detail]">
                    <span :class="[$style.username]">John Doe</span>
                    <span :class="[$style.date]"> - 10.03.2023</span>
                </div>
            </div>
        </a>
        <a href="/" :class="[$style.item]">
            <div v-if="withImage" :class="[$style.imageContainer]">
                <img :src="`${basePath}p1.jpeg`" alt="image" :class="[$style.image]" />
            </div>
            <div :class="[$style.textContainer]">
                <span :class="[$style.category, $style.fashion]">Fashion</span>
                <h3 :class="[$style.postTitle]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                <div :class="[$style.detail]">
                    <span :class="[$style.username]">John Doe</span>
                    <span :class="[$style.date]"> - 10.03.2023</span>
                </div>
            </div>
        </a>
    </div>
</template>

<style module>
.items {
    margin-top: 35px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    gap: 35px;
}

.item {
    display: flex;
    align-items: center;
    gap: 20px;
}

.imageContainer {
    flex: 1;
    position: relative;
    aspect-ratio: 1/1;
}

.image {
    object-fit: fill;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px solid lightgray;
}

.textContainer {
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.category {
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 12px;
    color: white;
    width: max-content;
}

.postTitle {
    font-size: 18px;
    font-weight: 500;
    color: var(--softTextColor);
}

.category {
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 12px;
    color: white;
    width: max-content;
}

.travel {
    background-color: #ff7857;
}

.culture {
    background-color: #ffb14f;
}

.food {
    background-color: #7fb881;
}

.fashion {
    background-color: #ff7887;
}

.coding {
    background-color: #775aec;
}

.culture {
    background-color: #ffb14f;
}

.detail {
    font-size: 12px;
}

.username {}

.date {
    color: gray;
}
</style>