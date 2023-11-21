<script setup lang="ts">
import type { PostItem } from '../../types/api/post';
import { generatePostPath } from '../../utils/post';


interface Props {
    size: 'large' | 'medium';
    post: PostItem
}

const props = defineProps<Props>()
</script>

<template>
    <div>
        <div :class="$style.verticalPost__avatar">
            <RouterLink :to="`/${generatePostPath(post.title, post.id)}`">
                <img :src="post.thumbnail" />
            </RouterLink>
        </div>
        <div :class="[size === 'large' && $style.topStory, size === 'medium' && $style.topStory_2nd]">
            <h3 :class="$style.title">
                <RouterLink :to="`/${generatePostPath(post.title, post.id)}`">
                    {{ post.title }}
                </RouterLink>
            </h3>
            <p :class="$style.mainDesc" v-if="size === 'large'">{{ post.mainDesc }}</p>
        </div>
    </div>
</template>

<style lang="scss" module>
.topStory {
    .title {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 10px;
    }

    .mainDesc {
        font-size: 14px;
        line-height: 21px;
        color: #555;
    }
}

.topStory_2nd {
    .title {
        font-size: 15px;
        line-height: 21px;
        font-weight: normal;
    }
}

.verticalPost {
    &__avatar {
        width: 100%;
        margin-bottom: 15px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>