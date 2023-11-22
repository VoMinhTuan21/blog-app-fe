<script setup lang="ts">
import { onMounted, ref, toRef, watch } from "vue";
import Comment from "./Comment.vue";
import { Icon } from "@iconify/vue";
import { useUser } from "../../stores/user";
import type { GetComments, IComment } from "../../types/api/comment";
import type { PaginationResponse } from "../../types/global";
import CommentRepository from "../../repositories/commentRepository";
import { toast } from "@steveyuowo/vue-hot-toast";
import Modal from '../modal/Modal.vue'
import LoginModal from '../LoginModal.vue'
import CommentLoading from '../loading/comment/CommentLoading.vue';

interface Props {
    postId: string;
}

const props = defineProps<Props>();

const userStore = useUser();

const commentInput = ref<HTMLDivElement>();
const inputTemp = ref<HTMLInputElement>();
const buttonThankModal = ref<HTMLButtonElement>()
const activatedTab = ref<1 | 2 | 3>(1);
const openForm = ref(false);
const countChar = ref(0);
const error = ref(false);
const loading = ref(false);

const paginationData = ref<PaginationResponse<IComment>>({
    total: 0,
    data: [],
    rowPerpage: 5,
});

const fetchComments = async (query: GetComments) => {
    loading.value = true
    const data = await CommentRepository.getMany(query);

    if (paginationData.value.total === 0) {
        paginationData.value = data;
    } else {
        paginationData.value.data = [...paginationData.value.data, ...data.data];
        paginationData.value.previous = data.previous;
        paginationData.value.next = data.next;
    }

    loading.value = false;
};

const clearForm = () => {
    if (commentInput.value) {
        if (commentInput.value.innerHTML.length > 0) {
            commentInput.value.innerHTML = "";
        } else {
            openForm.value = false;
        }
    }
};

const resetPaginationData = () => {
    paginationData.value = {
        data: [],
        total: paginationData.value.total,
        rowPerpage: 4
    }
}

const submitComment = async () => {
    if (commentInput.value) {
        const description = commentInput.value.innerHTML
            .replace(/<div>/g, "\n")
            .replace(/<\/div>/g, "")
            .replace(/<br>/g, "\n");

        if (!description || description.length > 1500) {
            return;
        }

        try {
            await CommentRepository.create({ description, postId: props.postId })
            commentInput.value.innerHTML = ''
            if (buttonThankModal.value) {
                buttonThankModal.value.click()
            }
        } catch (error) {
            toast.error("Tạo bình luận thất bại.")
        }
    }
}

onMounted(() => {
    if (commentInput.value) {
        commentInput.value.addEventListener("input", function () {
            const length =
                commentInput.value?.innerHTML
                    .replace(/<div>/g, "\n")
                    .replace(/<\/div>/g, "")
                    .replace(/<br>/g, "\n").length || 0;
            countChar.value = length;

            if (length > 1500 || length === 0) {
                error.value = true;
            } else {
                error.value = false;
            }
        });
    }

    if (inputTemp.value) {
        inputTemp.value.addEventListener("focus", function () {
            openForm.value = true;
            if (commentInput.value) {
                setTimeout(() => {
                    commentInput.value?.focus();
                }, 300);
            }

            if (inputTemp.value) {
                inputTemp.value.style.display = "none";
            }
        });
    }

    fetchComments({
        page: 0,
        limit: paginationData.value.rowPerpage,
        postId: props.postId,
        sortType: activatedTab.value,
    });
});

watch(activatedTab, () => {
    resetPaginationData()
    fetchComments({
        page: 0,
        limit: paginationData.value.rowPerpage,
        postId: props.postId,
        sortType: activatedTab.value,
    });
});

watch(toRef(props, 'postId'), () => {
    activatedTab.value = 1;
    resetPaginationData()
    fetchComments({
        page: 0,
        limit: paginationData.value.rowPerpage,
        postId: props.postId,
        sortType: activatedTab.value,
    });
})
</script>

<template>
    <div id="comment-box" :class="$style.comment">
        <h1 :class="$style.title">Bình luận {{ paginationData.total > 0 ? `(${paginationData.total})` : '' }}</h1>

        <input v-show="!openForm" ref="inputTemp" :class="$style['input-temp']" placeholder="Bình luận của bạn ..." />

        <div v-show="!userStore.isAuthenticated && openForm" :class="$style.unauthenticated">
            <button class="modal">Đăng nhập</button>
            <Icon :class="$style['close-icon']" icon="ooui:close" />
            <button>Đăng ký</button>
            <LoginModal />
        </div>

        <div v-show="userStore.isAuthenticated && openForm"
            :class="[$style['form-wrap'], openForm && $style['form-wrap-active']]">
            <div :class="$style['input-wrap']">
                <div ref="commentInput" :class="[$style.input, error && $style['input--error']]" contenteditable="true"
                    aria-placeholder="Bình luận của bạn ..."></div>
                <p contenteditable="false" :class="$style['count-char']">{{ countChar }}/1500 kí tự</p>

                <button @click="clearForm" :class="$style['clear-btn']">
                    <Icon :class="$style.icon" icon="material-symbols:close" />
                </button>
            </div>

            <p v-if="error && countChar > 1500" :class="$style['error-message']">
                Nội dung bình luận không dài hơn 1500 kí tự
            </p>
            <p v-else-if="error && countChar === 0" :class="$style['error-message']">
                Bạn chưa nhập nội dung bình luận
            </p>

            <div :class="$style['submit-wrap']">
                <button @click="submitComment" :class="$style['submit-btn']">Gửi</button>
            </div>
        </div>
    </div>

    <div v-if="paginationData.total === 0" :class="$style['no-comments']">
        <img src="https://static.vnncdn.net/v1/icon/comment-gray.svg" />
        <p>Hãy là người đầu tiên bình luận trong bài</p>
    </div>

    <div v-else :class="$style['react-tabs']">
        <ul :class="$style['react-tabs__tab-list']">
            <div :class="$style.sidebar">
                <li @click="() => {
                    activatedTab = 1;
                }
                    " :class="[$style['react-tabs__tab'], activatedTab === 1 && $style['react-tabs__tab-active']]">
                    <button>Mới nhât</button>
                </li>
                <li @click="() => {
                    activatedTab = 2;
                }
                    " :class="[$style['react-tabs__tab'], activatedTab === 2 && $style['react-tabs__tab-active']]">
                    <button>Quan tâm nhất</button>
                </li>
                <li @click="() => {
                    activatedTab = 3;
                }
                    " :class="[$style['react-tabs__tab'], activatedTab === 3 && $style['react-tabs__tab-active']]">
                    <button>Cũ nhất</button>
                </li>
            </div>
        </ul>

        <div :class="$style.comments">
            <Comment v-for="cmt in paginationData.data" :data="cmt" />
            <CommentLoading v-if="loading" v-for="i in 4" />

            <button v-if="paginationData.next && !loading" @click="() => {
                fetchComments({
                    page: paginationData.next?.page || 0,
                    limit: paginationData.rowPerpage,
                    sortType: activatedTab,
                    postId: props.postId
                })
            }" :class="$style['btn-more']">
                <span>Xem thêm bình luận</span>
                <Icon icon="solar:alt-arrow-down-outline" />
            </button>
        </div>
    </div>

    <button ref="buttonThankModal" v-show="false" class="thank-modal">open modal</button>

    <Modal data-toogle="thank-modal">
        <div :class="$style['thank-modal']">
            <h3>Thông báo</h3>
            <p>Cảm ơn bạn đã gửi bình luận!</p>
            <div>
                <button class="thank-modal">Đóng</button>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss" module>
.comment {
    margin-bottom: 18px;

    .title {
        color: #2d67ad;
        font-size: 18px;
        text-transform: uppercase;
        margin-bottom: 18px;
    }

    .input-temp {
        padding: 10px;
        border: 1px solid #e2e2e2;
        width: 100%;
        outline: none;
        font-size: 14px;

        &::placeholder {
            color: #a0a0a0;
        }
    }

    .form-wrap-active {
        display: block !important;
    }

    .form-wrap {
        display: none;

        .input-wrap {
            position: relative;
            margin-bottom: 5px;

            .clear-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background-color: transparent;
                border: none;
                outline: none;
                cursor: pointer;

                .icon {
                    width: 20px;
                    height: 20px;
                }
            }

            .count-char {
                position: absolute;
                bottom: 10px;
                left: 10px;
                font-size: 13px;
                color: #666666;
            }

            .input {
                border: 1px solid #e2e2e2;
                padding: 10px 30px 50px 10px;
                outline: none;
                font-size: 14px;
                width: 100%;
                max-width: 768px;
                position: relative;

                &:empty::before {
                    content: "Bình luận của bạn ...";
                    color: rgba(34, 47, 62, 0.7);
                }
            }

            .input--error {
                border-color: red !important;
            }
        }

        .error-message {
            color: red;
            font-size: 13px;
        }

        .submit-wrap {
            display: flex;
            justify-content: flex-end;

            .submit-btn {
                background-color: rgb(45, 103, 173);
                padding: 5px 20px;
                border-radius: 5px;
                border: 1px solid rgb(45, 103, 173);
                color: white;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
}

.react-tabs {
    &__tab-list {
        list-style: none;
        margin-bottom: 10px;

        .sidebar {
            border-bottom: 2px solid #d1d0d0;
            padding-bottom: 6px;
            display: flex;
            margin-bottom: 10px;
            justify-content: flex-end;
        }
    }

    &__tab {
        padding: 6px 12px;
        cursor: pointer;
        position: relative;

        button {
            font-size: 15px;
            border: none;
            font-family: "Noto Sans";
            outline: none;
            background: none;
            padding: 0 15px;
            cursor: pointer;
        }

        &:hover {
            button {
                color: #2d67ad;
            }
        }

        &-active {
            button {
                color: #2d67ad;
                font-weight: bold;
            }

            &.react-tabs__tab::after {
                position: absolute;
                content: "";
                width: 100%;
                bottom: -8px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: #2d67ad;
            }
        }
    }

    .comments {
        &>*+* {
            margin-top: 20px;
        }

        .btn-more {
            text-transform: uppercase;
            border-radius: 40px;
            display: flex;
            align-items: center;
            border: 1px solid rgb(45, 103, 173);
            color: rgb(45, 103, 173);
            font-weight: 600;
            justify-content: center;
            font-size: 14px;
            padding: 7px 10px;
            background-color: #fff;
            width: fit-content;
            margin: 0 auto;
        }
    }
}

.no-comments {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    gap: 10px;

    img {
        width: 40px;
    }

    p {
        width: 275px;
        font-size: 16px;
        color: #797979;
        padding: 0 10px;
    }
}

.unauthenticated {
    background-color: rgba(0, 0, 0, 0.4392156862745098);
    text-align: center;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;

    .close-icon {
        position: absolute;
        color: white;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    button {
        border: none;
        outline: none;
        padding: 10px 30px;
        font-weight: bold;
        font-family: "Noto Sans";
        cursor: pointer;
    }

    button:first-child {
        background-color: white;
        color: black;
        margin-right: 20px;
    }

    button:last-child {
        background-color: rgb(45, 103, 173);
        color: white;
    }
}

.thank-modal {
    width: 40vw;
    border-radius: 5px;
    padding: 20px 10px;
    background-color: white;

    h3 {
        color: #2d67ad;
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 10px;
    }

    p {
        text-align: center;
        margin-bottom: 15px;
    }

    div {
        display: flex;
        justify-content: center;
    }

    button {
        border: none;
        background-color: #2d67ad;
        color: white;
        font-family: 'Noto Sans', sans-serif;
        padding: 10px 40px;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>
