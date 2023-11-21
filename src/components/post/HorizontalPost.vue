<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { PostItem } from '../../types/api/post';
import { generatePostPath } from '../../utils/post';

interface Props {
    size?: string;
    post: PostItem
}

const props = defineProps<Props>()

</script>

<template>
    <div :class="[$style.horizontalPost, size === 'large' && $style.large]">
        <div :class="[$style.horizontalPost__avatar]">
            <RouterLink :to="`/${generatePostPath(post.title, post.id)}`">
                <img :src="post.thumbnail" />
            </RouterLink>
        </div>
        <div>
            <RouterLink :to="`/${generatePostPath(post.title, post.id)}`" v-if="size === 'large'" :class="$style.cate">{{
                post.category.title }}</RouterLink>
            <h3 :class="[$style.horizontalPost__title]">

                <RouterLink :to="`/${generatePostPath(post.title, post.id)}`">
                    {{ post.title }}
                </RouterLink>
                <RouterLink v-if="post.comments > 0" :class="$style.comment"
                    :to="`/${generatePostPath(post.title, post.id)}#comment-box`">
                    <Icon :class="$style['icon-image']" icon="bxs:message" />
                    {{ post.comments }}
                </RouterLink>
            </h3>
            <p :class="$style['main-desc']" v-if="size === 'large'">
                {{ post.mainDesc }}
            </p>
        </div>
    </div>
</template>

<style lang="scss" module>
.horizontalPost {

    display: flex;
    gap: 10px;

    &.large {
        gap: 15px !important;

    }

    &__avatar {
        max-width: 140px;
        flex-shrink: 0;

        a {
            width: 100%;
            height: 100%;
            display: block;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__title {
        font-size: 15px;
        line-height: 21px;
        font-weight: normal;

        .comment {
            font-size: 12px;
            display: inline-flex;
            align-items: center;
            gap: 4px;

            &:hover {
                color: #2d67ad;
            }
        }

        .icon-image {
            width: 16px;
            height: 16px;
            color: #e2e2e2;
        }
    }

    .large &__avatar {
        max-width: 245px !important;
    }

    .large &__title {
        font-size: 20px !important;
        line-height: 26px !important;
        font-weight: bold !important;
        margin-bottom: 10px;

        a {
            @if(length(parent-child('p')) > 1) {
                &:last-child {
                    font-weight: normal !important;
                    color: #2d67ad !important;
                }
            }
        }
    }

    .cate {
        color: #2d67ad;
        text-transform: uppercase;
        font-size: 13px;
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
    }

    .main-desc {
        font-size: 16px;
        line-height: 22px;
        color: #6c6c6c;
        font-family: Arial, sans-serif;
    }
}
</style>