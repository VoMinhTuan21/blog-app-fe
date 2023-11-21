<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useCategory } from '../stores/category';
import LoginModal from '../components/LoginModal.vue'
import { useUser } from '../stores/user';

const basePath = import.meta.env.BASE_URL;

const categoriesStore = useCategory();
const userStore = useUser();

const formRef = ref<HTMLDivElement | null>(null);
const openFormSearch = ref(false);
const openMenu = ref(false);
const searchKey = ref('');

const toggleForm = () => {
    openFormSearch.value = !openFormSearch.value;
}

const toggleMenu = () => {
    openMenu.value = !openMenu.value
}

const search = () => {
    if (searchKey.value) {
        alert(searchKey);
    } else {
        toggleForm();
    }
}

const logout = () => {
    userStore.logout()
    localStorage.removeItem('blog-app-access-token')
    localStorage.removeItem('blog-app-refresh-token')
    openMenu.value = false;
}

onMounted(() => {
    window.addEventListener("scroll", function () {
        const nav = document.getElementById("nav");
        if (nav) {

            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                nav.style.boxShadow = "0 2px 8px rgba(0, 0, 0, .102)";
            } else {
                nav.style.boxShadow = "none";
            }
        }

    });
})

</script>

<template>
    <header :class="$style.header">
        <div :class="$style.container">
            <div :class="$style['container__left']">
                <img :class="$style.logo" alt="vietnamenet" :src="`${basePath}logo.svg`" />
                <p :class="$style['header__clock']">{{ new Date().toLocaleDateString('vi-VN', {
                    weekday: 'long', year: 'numeric', month: 'numeric', day:
                        'numeric'
                }) }}</p>
            </div>
            <div :class="$style['container__right']">
                <p :class="$style['container__right-item']">Tin tức 24h</p>
                <p :class="$style['container__right-item']">Postcast</p>
                <p :class="$style['container__right-item']">Tuần Việt Nam</p>
                <div :class="$style.authenticated" v-if="userStore.isAuthenticated">
                    <button @click="toggleMenu" :class="$style.authenticated__btn">TM</button>
                    <div v-show="openMenu" :class="$style.authenticated__menu">
                        <ul>
                            <div></div>
                            <li>{{ userStore.user.name }}</li>
                            <li>Thôn tin tài khoản</li>
                            <li @click="logout">Đăng xuất</li>
                        </ul>
                    </div>
                </div>
                <button v-else class="modal" :class="$style['btn-login']">
                    <span>Đăng nhập</span>
                    <Icon :class="$style['btn-login--icon']" icon="teenyicons:user-circle-solid" />
                </button>
                <button @click="toggleForm" :class="$style['btn-search']">
                    <Icon :class="[$style['icon-search']]" icon="carbon:search" />
                </button>
                <div :class="$style.header__search">
                    <form ref="formRef" :class="[$style.form__wrapper, openFormSearch && $style['form--active']]">

                        <input placeholder="Tìm kiếm ..." v-model="searchKey" :class="$style.input__search" type="text">
                        <button @click="search" type="button" :class="$style.btn__search">
                            <Icon :class="[$style['icon-search']]" icon="carbon:search" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </header>

    <nav id="nav" :class="$style.nav">
        <ul :class="$style.mainNav">
            <li :class="$style['mainNav-item']">
                <RouterLink to="/">
                    <Icon :class="$style['icon-home']" icon="ant-design:home-filled" />
                </RouterLink>
            </li>

            <li v-for="cate in categoriesStore.categories"
                :class="[$style['mainNav-item'], cate.id === categoriesStore.selectedCate?.id && $style['mainNav-item--active']]">
                <RouterLink :to="`/${cate.title.toLowerCase().replace(' ', '-')}`">{{ cate.title }}</RouterLink>
            </li>
        </ul>
    </nav>

    <LoginModal />
</template>

<style lang="scss" module>
.header {
    width: 100%;
    border-bottom: 1px solid #e2e2e2;

    .container {
        display: flex;
        justify-content: space-between;
        max-width: 1140px;
        padding: 0 20px;
        margin: auto;
        height: 60px;
        position: relative;

        &__right {
            display: flex;
            align-items: center;
            position: relative;

            &-item {
                margin-left: 10px;
                margin-right: 10px;
                font-size: 12px;
                line-height: 12px;
                color: #555;
                position: relative;

            }

            &-item::after {
                content: "";
                position: absolute;
                right: -10px;
                top: 0;
                border: 1px solid #e2e2e2;
                height: 100%
            }

            .btn-login {
                border: none;
                outline: none;
                background: none;
                display: flex;
                gap: 5px;
                align-items: center;
                margin-left: 10px;
                font-family: 'Noto Sans';
                cursor: pointer;

                span {
                    color: #555;
                    font-size: 12px;
                }

                &--icon {
                    width: 20px;
                    height: 20px;
                    color: #c0c0c0;
                }
            }

            .btn-search {
                border: none;
                margin-left: 10px;
                background-color: transparent;
                cursor: pointer;
            }

            .icon-search {
                width: 22px;
                height: 22px;
                color: #c0c0c0
            }
        }

        &__left {
            display: flex;
            align-items: center;
            column-gap: 10px;
        }
    }

    &__search {
        position: absolute;
        width: 50vw;
        right: 0;

        .form--active {
            display: block !important;
        }

        .form__wrapper {
            position: relative;
            display: none;
        }

        .input__search {
            border: 1px solid #ababab;
            color: #555;
            border-radius: 15px;
            width: 100%;
            outline: none;
            font-size: 14px;
            height: 32px;
            padding-left: 9px;
            padding-right: 32px;
        }

        .input__search::placeholder {
            color: #ababab;
            font-style: italic;
        }


        .btn__search {
            position: absolute;
            background-color: transparent;
            border: none;
            right: 6px;
            transform: translateY(-50%);
            top: 50%;
        }
    }

    .logo {
        width: 120px;
    }

    &__clock {
        font-size: 12px;
        color: #555;
    }
}

.nav {
    position: sticky;
    top: 0;
    height: 48px;
    background-color: #fff;
    border-bottom: 1px solid #e2e2e2;
    z-index: 10;

    .mainNav {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        list-style: none;
        gap: 10px;

        .icon-home {
            width: 20px;
            height: 20px;
            color: #2d67ad;
        }

        &-item {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;

            a {
                color: #2a2a2a;
                font-weight: bold;
                font-size: 14px
            }

            &::after {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 3px;
                background-color: #2d67ad;
            }
        }

        &-item:first-child:hover::after {
            content: none;
        }

        &-item--active,
        &-item:hover {
            a {
                color: #2d67ad;
            }

            &::after {
                content: "";
            }
        }
    }
}

.authenticated {
    margin-left: 10px;
    position: relative;

    &__btn {
        border: none;
        width: 27px;
        background: none;
        border-radius: 50%;
        aspect-ratio: 1/1;
        cursor: pointer;
        background-color: #447ec5;
        text-align: center;
        color: white;
    }

    &__menu {
        position: absolute;
        width: 200px;
        top: 50px;
        right: -15px;
        display: block;
        background-color: white;
        z-index: 20;
        border-radius: 5px;

        ul {
            list-style: none;
            border: 1px solid #e2e2e2;
            padding-left: 10px;

            div {
                position: absolute;
                width: 15px;
                height: 15px;
                border: 1px solid #e2e2e2;
                border-right: none;
                border-bottom: none;
                transform: rotate(45deg);
                top: -8px;
                right: 20px;
                background-color: #fff;
            }

            li {
                font-size: 15px;
                color: #2a2a2a;
                padding-top: 10px;
                padding-bottom: 10px;
                cursor: pointer;
            }

            & li:nth-child(2) {
                padding-top: 17px;
                padding-bottom: 17px;
                font-weight: bold;
                border-bottom: 1px solid #e2e2e2;
            }

        }
    }
}
</style>