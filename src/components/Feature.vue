<script setup lang="ts">
const basePath = import.meta.env.BASE_URL
</script>

<template>
    <div :class="[$style.container]">
        <h1 :class="[$style.title]">
            <b>Hey, Navi here!</b> Discover my stories and creative ideas
        </h1>

        <div :class="[$style.post]">
            <div :class="[$style.imgContainer]">
                <img :src="`${basePath}p1.jpeg`" :class="[$style.image]" />
            </div>
            <div :class="[$style.textContainer]">
                <h1 :class="[$style.postTitle]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <p :class="[$style.postDesc]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione minus
                    reprehenderit rem ullam deleniti
                    qui saepe id quae perspiciatis. Nesciunt tempora enim eveniet modi, voluptatem quae veniam officia eaque
                    ipsa.</p>
                <button :class="[$style.button]">Read more</button>
            </div>
        </div>
    </div>
</template>

<style module>
.container {
    margin-top: 30px;
}

.title {
    font-size: 96px;
}

.post {
    margin-top: 60px;
    display: flex;
    align-items: center;
    gap: 50px;
}

.imgContainer {
    flex: 1;
    height: 500px;
    position: relative;
}

.image {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.textContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.postTitle {
    font-size: 40px;
}

.postDesc {
    font-size: 20px;
    font-weight: 300;
    color: var(--softTextColor);
}

.button {
    padding: 16px 20px;
    border: none;
    border-radius: 5px;
    width: max-content;
}

@media screen and (max-width:1280px) {
    .title {
        font-size: 72px;
    }
}

@media screen and (max-width:1024px) {
    .title {
        font-size: 64px;
    }

    .imgContainer {
        display: none;
    }
}

@media screen and (max-width:768px) {
    .title {
        font-size: 48px;
    }
}

@media screen and (max-width:640px) {
    .title {
        font-size: 36px;
    }
}
</style>