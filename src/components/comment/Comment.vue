<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import type { IComment } from '../../types/api/comment';
import { formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import CommentRepository from '../../repositories/commentRepository';

interface Props {
    data: IComment
}

const { data } = defineProps<Props>()

const showMore = ref(false);
const reactionType = ref(1);

const toggleLike = () => {
    CommentRepository.reactionComment(data.id, reactionType.value).then(() => {
        if (reactionType.value === 1) {
            reactionType.value = 2
            data.love += 1;
        } else {
            reactionType.value = 1
            if (data.love > 0) {
                data.love -= 1
            }
        }


    })
}

</script>

<template>
    <div :class="$style.comment">
        <div :class="$style['user-avatar']">{{ (data.user.name.split(' ').pop() || 'user')[0].toUpperCase() }}</div>
        <div>
            <h3 :class="$style['user-name']">{{ data.user.name }}</h3>
            <p :class="$style.content">
                <template v-if="data.description.length < 200">
                    {{ data.description }}
                </template>
                <template v-else>
                    <template v-if="!showMore">
                        {{ data.description.slice(0, 200) }}
                        <span @click="() => { showMore = true }" :class="$style['read-more']"> ...Đọc tiếp</span>
                    </template>
                    <template v-else>
                        {{ data.description }}
                    </template>
                </template>
            </p>
            <div :class="$style.actions">
                <button @click="toggleLike">
                    <span :class="data.love > 0 && $style.acitve">{{ data.love }}</span>
                    <Icon :class="data.love > 0 && $style.acitve" icon="zondicons:heart" />
                </button>
                <span>.</span>
                <span>{{ formatDistanceToNow(new Date(data.createdAt), { locale: vi }) }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.comment {
    display: flex;
    gap: 10px;
    padding: 8px 0;

    .user-avatar {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background-color: rgb(229, 231, 235);
        border: none;
        border-radius: 50%;
        text-transform: uppercase;
        text-align: center;
        line-height: 32px;
        font-size: 18px;
        color: rgb(153, 153, 153);
    }

    .user-name {
        font-size: 16px;
        --tw-text-opacity: 1;
        color: rgba(4, 65, 109, var(--tw-text-opacity));
        font-weight: bold;
        line-height: 24px;
    }

    .content {
        font-size: 15px;
        line-height: 22.5px;
        margin-bottom: 5px;

        .read-more {
            color: #999;
            cursor: pointer;
        }
    }

    .actions {
        --tw-text-opacity: 1;
        color: rgba(153, 153, 153, var(--tw-text-opacity));
        font-size: 14px;

        button {
            background: none;
            border: none;
            outline: none;
            padding: 0 10px;
            color: rgba(153, 153, 153);
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            cursor: pointer;
        }

        span:last-child {
            padding-left: 10px;
        }

        .acitve {
            color: #2d67ad;
        }
    }
}
</style>