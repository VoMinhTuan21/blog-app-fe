<script setup lang="ts">
import type { Category } from '../types/api/category';
import type { PostLatest } from '../types/api/post';
import { generatePostPath } from '../utils/post'

interface Props {
    category: Category;
    posts: PostLatest[]
    class?: string | string[]
}

const { category, posts } = defineProps<Props>();
</script>

<template>
    <div :class="[$style.boxCate]">
        <h3 :class="$style.boxCate__title">
            <RouterLink to="/">
                {{ category.title }}
            </RouterLink>
        </h3>
        <div :class="$style.boxCate__main">
            <div :class="$style.boxCateItem">
                <div :class="$style.boxCateItem__avatar">
                    <RouterLink to="/">
                        <img :src="posts[0].thumbnail" />
                    </RouterLink>
                </div>
                <h3 :class="$style.boxCateItem__title">
                    <RouterLink :to="`/${generatePostPath(posts[0].title, posts[0].id)}`">
                        {{ posts[0].title }}
                    </RouterLink>
                </h3>
            </div>

            <h3 v-for="post in posts.slice(1)" :class="$style['boxCateItem-title']">
                <RouterLink :to="`/${generatePostPath(post.title, post.id)}`">
                    {{ post.title }}
                </RouterLink>
            </h3>
        </div>
    </div>
</template>

<style lang="scss" module>
.boxCate {

    &__title {
        text-transform: uppercase;
        color: #2d67ad;
        font-size: 18px;
        padding-bottom: 5px;
        border-bottom: 1px solid #add2ff;
        margin-bottom: 15px;
    }

    &__main {
        &>*+* {
            margin-top: 15px;
        }
    }
}

.boxCateItem {

    display: flex;
    gap: 15px;

    &__avatar {
        max-width: 140px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__title {
        font-size: 15px;
        line-height: 21px;
        font-weight: bold;
    }

    &-title {
        font-size: 15px;
        line-height: 21px;
        font-weight: normal;
    }
}
</style>