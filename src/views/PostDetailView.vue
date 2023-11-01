<script setup lang="ts">
import Menu from '../components/Menu.vue'
import Comment from '../components/Comment.vue'

const basePath = import.meta.env.BASE_URL

</script>

<template>
    <div :class="[$style.container]">
        <div :class="[$style.infoContainer]">
            <div :class="[$style.textContainer]">
                <h1 :class="[$style.title]">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
                <div :class="[$style.user]">
                    <div :class="[$style.userImageContainer]">
                        <img :src="`${basePath}p1.jpeg`" :class="[$style.avatar]" />
                    </div>
                    <div :class="[$style.userTextContainer]">
                        <span :class="[$style.username]">John Doe</span>
                        <span :class="[$style.date]">11.02.2023</span>
                    </div>
                </div>
            </div>
            <div :class="[$style.imageContainer]">
                <img :src="`${basePath}p1.jpeg`" :class="[$style.image]" />
            </div>
        </div>
        <div :class="[$style.content]">
            <div :class="[$style.post]">
                <div :class="[$style.description]">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor odit quo illo quos nobis aliquam
                        fugit
                        earum inventore nulla iusto, excepturi saepe rerum aperiam, totam culpa non quam placeat. Quaerat?
                    </p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor odit quo illo quos nobis aliquam
                        fugit
                        earum inventore nulla iusto, excepturi saepe rerum aperiam, totam culpa non quam placeat. Quaerat?
                    </p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor odit quo illo quos nobis aliquam
                        fugit
                        earum inventore nulla iusto, excepturi saepe rerum aperiam, totam culpa non quam placeat. Quaerat?
                    </p>
                </div>
                <div :class="[$style.comment]">
                    <Comment />
                </div>
            </div>
            <Menu />
        </div>
    </div>
</template>

<style module>
.container {}

.infoContainer {
    display: flex;
    align-items: center;
    gap: 50px;
}

.textContainer {
    flex: 1;
}

.title {
    font-size: 64px;
    margin-bottom: 50px;
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

.content {
    display: flex;
    gap: 50px;
}

.post {
    flex: 5;
    margin-top: 60px;
}

.user {
    display: flex;
    align-items: center;
    gap: 20px;
}

.avatar {
    border-radius: 50%;
    object-fit: fill;
    width: 100%;
    height: 100%;
}

.userImageContainer {
    width: 50px;
    height: 50px;
    position: relative;
}

.userTextContainer {
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: var(--softTextColor);
}

.username {
    font-size: 20px;
    font-weight: 500;
}

.date {}

.description p {
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 20px;
}

.comment {}

@media screen and (max-width:1536px) {
    .title {
        font-size: 54px;
    }
}

@media screen and (max-width:1280px) {
    .title {
        font-size: 48px;
    }
}

@media screen and (max-width:1024px) {
    .imageContainer {
        display: none;
    }
}

@media screen and (max-width:640px) {
    .title {
        font-size: 36px;
    }

    .description p {
        font-size: 18px;
    }
}
</style>