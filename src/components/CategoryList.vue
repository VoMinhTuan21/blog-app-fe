<script setup lang="ts">
const basePath = import.meta.env.BASE_URL
</script>

<template>
    <div :class="[$style.container]">
        <h1 :class="[$style.title]">Popular category</h1>
        <div :class="[$style.categories]">
            <a href="/blogs?cat=style" :class="[$style.catgory, $style.style]">
                <img :src="`${basePath}style.png`" alt="icon" width="32" height="32" :class="[$style.image]" /> Style
            </a>
            <a href="/blogs?cat=style" :class="[$style.catgory, $style.fashion]">
                <img :src="`${basePath}fashion.png`" alt="icon" width="32" height="32" :class="[$style.image]" /> Fashion
            </a>
            <a href="/blogs?cat=style" :class="[$style.catgory, $style.food]">
                <img :src="`${basePath}food.png`" alt="icon" width="32" height="32" :class="[$style.image]" /> Food
            </a>
            <a href="/blogs?cat=style" :class="[$style.catgory, $style.travel]">
                <img :src="`${basePath}travel.png`" alt="icon" width="32" height="32" :class="[$style.image]" /> Travel
            </a>
            <a href="/blogs?cat=style" :class="[$style.catgory, $style.culture]">
                <img :src="`${basePath}culture.png`" alt="icon" width="32" height="32" :class="[$style.image]" /> Culture
            </a>
            <a href="/blogs?cat=style" :class="[$style.catgory, $style.coding]">
                <img :src="`${basePath}coding.png`" alt="icon" width="32" height="32" :class="[$style.image]" /> Coding
            </a>
        </div>
    </div>
</template>

<style module>
.container {}

.categories {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
}

.catgory {
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: capitalize;
    width: 15%;
    height: 80px;
    justify-content: center;
    border-radius: 10px;
}

.title {
    margin: 50px 0px;
}

.image {
    border-radius: 50%;
}

.style {
    background-color: #57c4ff31;
}

.fashion {
    background-color: #da85c731;
}

.food {
    background-color: #7fb88133;
}

.travel {
    background-color: #ff795736;
}

.culture {
    background-color: #ffb04f45;
}

.coding {
    background-color: #5e4fff31;
}

@media screen and (max-width:1280px) {
    .catgory {
        width: 20%;
    }
}

@media screen and (max-width:1024px) {
    .catgory {
        width: 25%;
    }
}

@media screen and (max-width:768px) {
    .catgory {
        width: 45%;
    }
}

@media screen and (max-width:640px) {
    .catgory {
        width: 100%;
    }
}
</style>