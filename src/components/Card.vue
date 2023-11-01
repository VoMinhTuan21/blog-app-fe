<script setup lang="ts">
const basePath = import.meta.env.BASE_URL
</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.imageContainer]">
            <img :src="`${basePath}p1.jpeg`" :class="[$style.image]" />
        </div>
        <div :class="[$style.textContainer]">
            <div :class="[$style.detail]">
                <span :class="[$style.date]">11.02.2023 - </span>
                <span :class="[$style.category]">CULTURE</span>
            </div>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
            <p :class="[$style.desc]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci recusandae deserunt
                quidem. Sequi cumque
                ipsum mollitia fugit quam, consequatur, maiores pariatur, quibusdam fuga numquam commodi in quaerat suscipit
                sint repellat?</p>
            <a href="/" :class="[$style.link]">Read More</a>
        </div>
    </div>
</template>

<style module>
.container {
    margin-bottom: 50px;
    display: flex;
    gap: 50px;
    align-items: center;
}

.imageContainer {
    flex: 1;
    height: 350px;
    position: relative;
}

.image {
    object-fit: fill;
    width: 100%;
    height: 100%;
}

.textContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.detail {}

.date {
    color: gray;
}

.category {
    color: crimson;
    font-weight: 500;
}

.desc {
    font-size: 18px;
    font-weight: 300;
    color: var(--softTextColor);
}

.link {
    border-bottom: 1px solid crimson;
    width: max-content;
    padding: 2px 0;
}

@media screen and (max-width: 1280px) {
    .imageContainer {
        display: none;
    }
}
</style>