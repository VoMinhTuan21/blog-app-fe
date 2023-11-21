<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import type { Post, PostItem, PostLatest } from '../types/api/post';
import PostRepository from '../repositories/postRepository';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Icon } from '@iconify/vue';
import HorizontalPost from '../components/post/HorizontalPost.vue'
import CommentSection from '../components/comment/CommentSection.vue'
import { useCategory } from '../stores/category';
import HorizontalPostLoading from '../components/loading/post/HorizontalPostLoading.vue';
import useApi from '../custom-hook/useAPI';

const route = useRoute();
const categoriesStore = useCategory();

const descContainer = ref<HTMLDivElement>();
const relatedPosts = ref<PostLatest[]>([]);
const latestPosts = ref<PostItem[]>([]);
const loading = ref(false);
const post = ref<Post | null>(null);

const scrollToCommentBox = () => {
    const commentBox = document.getElementById('comment-box');
    if (commentBox) {
        const y = commentBox.getBoundingClientRect().top + window.scrollY - 65;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

const handleGetData = () => {
    loading.value = true;
    const slug = route.params.slug as string
    const postId = slug.split("_").pop() || "";

    PostRepository.getOne(postId).then(data => { post.value = data.data, categoriesStore.setSelectedCate(data.data.category) });
    PostRepository.getLatestPosts(postId, 10).then(data => { latestPosts.value = data.data });
    PostRepository.getRelatedPosts(postId, 4).then(data => { relatedPosts.value = data }).then(() => { loading.value = false });
}

onMounted(() => {
    handleGetData()
})

onUnmounted(() => {
    categoriesStore.setSelectedCate(undefined)
})

watch(route, handleGetData);

watch(post, () => {
    setTimeout(() => {

        if (post.value && descContainer.value) {

            descContainer.value.innerHTML = post.value.desc;

            for (const image of post.value.images) {
                const id = image.url.split('/').pop()?.split('_').shift() || "";

                const imgCmp = document.getElementById(id);

                imgCmp?.setAttribute('src', image.url)
            }
        }
    }, 300)
})

</script>

<template>
    <div :class="$style['header-ads']">
        <iframe
            src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-13/anhnguyendoanle/980x90_T11_34/980x90_T11_34/980x90_T11_34.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fvtv.vn%252Fxa-hoi%252Fdon-luc-phong-chong-sat-lo-bo-song-dong-bang-song-cuu-long-20231113192921223.htm%26rid%3D79e1a465-c078-459f-9e11-fff8c09ac59c121-6552e518%26sspb%3D34500%26sspr%3D1.482%26lsn%3D1699931413929%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3D1f34f1ab-ff6e-43f7-97b8-6f2c9cca5ca3%26bi%3D0%26cmpg%3D84198%26items%3D362185%26zid%3D500872%26pr%3D36276982846%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D016552d87240137c778acc3ebb4cc298%26xtr%3DeyJhc2lkIjoxMTgyLCJwcm9maWxlaWQiOiIxZjM0ZjFhYi1mZjZlLTQzZjctOTdiOC02ZjJjOWNjYTVjYTMifQ%253D%253D%26sspz%3D3980%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fnhathuoclongchau.com.vn%252F%253Futm_source%253DAdmicro%2526utm_medium%253DCPC%2526utm_campaign%253DAdhoc-UT-11-2023%2526utm_term%253DNew%2526utm_content%253Dvtv.vn&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_500872_0_362185&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dvtv.vn%252Fxa-hoi%252Fdon-luc-phong-chong-sat-lo-bo-song-dong-bang-song-cuu-long-20231113192921223.htm%26z%3D500872%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699931413929%26dgid%3D016552d87240137c778acc3ebb4cc298%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D1%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D362185"
            width="980" height="90" frameborder="0" scrolling="0" />
    </div>
    <section :class="$style.main">
        <div :class="$style.container">
            <div :class="$style.container__left">
                <div :class="$style.cate">
                    <h3>
                        <RouterLink to="/">{{ categoriesStore.categories.find(item => item.id === post?.category)?.title }}
                        </RouterLink>
                    </h3>
                    <span>{{ new Date().toLocaleString('vi-VN', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false
                    }) }}</span>
                </div>
                <div :class="$style.content">
                    <h1 :class="$style['content-title']">{{ post?.title }}</h1>

                    <div :class="$style.author">
                        <div :class="$style.author__left">
                            <RouterLink to="/">
                                <img :class="$style['author__left-avatar']" :src="post?.user.avatar" />
                            </RouterLink>

                            <p :class="$style['author__left-name']">
                                <RouterLink to="/">{{ post?.user.name }}</RouterLink>
                            </p>
                        </div>

                        <div :class="$style.author__right">
                            <Icon :class="$style.icon" icon="zondicons:arrow-right" />
                            <RouterLink to="/">
                                Xem các bài viết của tác giả
                            </RouterLink>
                        </div>
                    </div>

                    <div :class="$style['share-social']">
                        <a :class="[$style.facebook, $style.link]" href="/">
                            <span :class="$style.icon"></span>
                        </a>
                        <a :class="[$style.zalo, $style.link]" href="/">
                            <span :class="$style.icon"></span>
                        </a>
                        <a :class="[$style.email, $style.link]" href="/">
                            <span :class="$style.icon"></span>
                        </a>
                        <a :class="[$style.share, $style.link]" href="/">
                            <span :class="$style.icon"></span>
                        </a>
                        <a :class="[$style.bookmark, $style.link]" href="/">
                            <span :class="$style.icon"></span>
                        </a>
                    </div>

                    <h1 :class="$style['main-desc']">{{ post?.mainDesc }}</h1>

                    <div :class="$style['main-content']" class="ql-editor" style="padding: 0;" ref="descContainer">

                    </div>
                </div>
            </div>
            <div :class="$style.container__right">
                <iframe
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-11/dieplamthi/300x250FIATO/300x250FIATO/300x250FIATO.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3D07c71c91-9806-415a-a52d-d7c4b4c66a66141-6552ec20%26sspb%3D9960%26sspr%3D0.0001%26lsn%3D1699933209631%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3Da7886958-408e-4b6c-8315-d6669015beec%26bi%3D0%26cmpg%3D84174%26items%3D361998%26zid%3D511950%26pr%3D36270214915%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D01654f913d6d3905261ed25232f2a568%26xtr%3DeyJhc2lkIjo1MjE5LCJwcm9maWxlaWQiOiJhNzg4Njk1OC00MDhlLTRiNmMtODMxNS1kNjY2OTAxNWJlZWMifQ%253D%253D%26sspz%3D2013887%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Ffiatocity.vn%252F%253Futm_source%253Dadmicro-mac%2526utm_medium%253Dadx%2526utm_campaign%253DFiatoCity%2526utm_term%253Dtarget-PC%2526utm_content%253D%255Bdomainsite%255D&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_511950_0_361998&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dthanhnien.vn%252F%26z%3D511950%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699933209631%26dgid%3D01654f913d6d3905261ed25232f2a568%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D361998"
                    frameborder="0" scrolling="no" width="300" height="250" />

                <div :class="$style['news-suggest']">
                    <h3 :class="$style.heading">Có thể bạn quan tâm</h3>
                    <div :class="$style.news">
                        <HorizontalPost v-if="!loading && relatedPosts && relatedPosts.length > 0"
                            v-for="rltPost in relatedPosts"
                            :post="{ thumbnail: '', ...rltPost, mainDesc: '', comments: 0, category: { id: '', title: '' } }" />

                        <HorizontalPostLoading v-if="loading" v-for="i in 4" />
                        <div>
                            <RouterLink :class="$style['btn-back-to-home']" to="/">
                                <Icon :class="$style['icon-back']" icon="iconamoon:arrow-left-2-duotone" />
                                Quay lại trang chủ
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.container">
            <div :class="$style.container__left">
                <div :class="$style['related-news']">
                    <ul>
                        <li v-if="relatedPosts" v-for="rltPost in relatedPosts.slice(0, 3)">
                            <RouterLink to="/">
                                {{ rltPost.title }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>

                <div :class="$style['share-social']">

                    <button @click="scrollToCommentBox" :class="$style['btn-comment']">
                        Bình luận
                    </button>

                    <a :class="[$style.facebook, $style.link]" href="/">
                        <span :class="$style.icon"></span>
                    </a>
                    <a :class="[$style.zalo, $style.link]" href="/">
                        <span :class="$style.icon"></span>
                    </a>
                    <a :class="[$style.email, $style.link]" href="/">
                        <span :class="$style.icon"></span>
                    </a>
                    <a :class="[$style.share, $style.link]" href="/">
                        <span :class="$style.icon"></span>
                    </a>
                    <a :class="[$style.bookmark, $style.link]" href="/">
                        <span :class="$style.icon"></span>
                    </a>
                </div>

                <div :class="$style['ads-bottom']">
                    <iframe scrolling="no" width="300" height="250"
                        src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-04/manhnguyentien/300x250/300x250/300x250.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252Ftphcm-benh-nhan-keu-cuu-vi-thi-luc-con-2-10-sau-mo-mat-can-18523111209440032.htm%26rid%3Dec7fe257-6a2b-409f-a540-34b0aa0f7a8a120-65533b36%26sspb%3D6800%26sspr%3D0.2931%26lsn%3D1699953455923%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3Da7886958-408e-4b6c-8315-d6669015beec%26bi%3D0%26cmpg%3D84045%26items%3D361248%26zid%3D520869%26pr%3D36194272202%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D01654f913d6d3905261ed25232f2a568%26xtr%3DeyJhc2lkIjoxNDEwMiwicHJvZmlsZWlkIjoiYTc4ODY5NTgtNDA4ZS00YjZjLTgzMTUtZDY2NjkwMTViZWVjIn0%253D%26sspz%3D2028042%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fwww.toyota.com.vn%252Fveloz-cross-cvt-top%253Futm_source%253DFLIX_BANNER%2526utm_medium%253DADX%2526utm_campaign%253DBMPV_YE_PROMO%2526utm_content%253DNOV_PROMO&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_520869_0_361248&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dthanhnien.vn%252Ftphcm-benh-nhan-keu-cuu-vi-thi-luc-con-2-10-sau-mo-mat-can-18523111209440032.htm%26z%3D520869%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699953455923%26dgid%3D01654f913d6d3905261ed25232f2a568%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D1%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D361248"
                        frameborder="0"></iframe>

                    <img width="300" height="250"
                        src="https://tpc.googlesyndication.com/simgad/5097837300241667623?sqp=4sqPyQQ7QjkqNxABHQAAtEIgASgBMAk4A0DwkwlYAWBfcAKAAQGIAQGdAQAAgD-oAQGwAYCt4gS4AV_FAS2ynT4&rs=AOga4qnfev1mxwrrd-qVQA6rHZwUQpjw1g" />
                </div>

                <CommentSection v-if="post" :post-id="post.id" />

                <h3 :class="$style['title-primary']">Tin nổi bật</h3>

                <div :class="$style['articles-list']">
                    <HorizontalPost v-if="!loading && latestPosts.length > 0" v-for="ltPost in latestPosts" :post="ltPost"
                        size="large" />
                    <HorizontalPostLoading v-else size="large" v-for="i in 5" />
                </div>
            </div>

            <div :class="$style.container__right">
                <iframe :class="$style['ads-right']"
                    src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-11/dieplamthi/300x600FIATO/300x600FIATO/300x600FIATO.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252Fpho-chu-tich-xa-doi-8-trieu-dong-cua-dan-de-lam-giay-khai-sinh-185231114150544153.htm%26rid%3D74981083-4e27-4cac-bc2d-2f1192ab59ed140-655342f4%26sspb%3D4920%26sspr%3D0.2063%26lsn%3D1699955440244%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3Da7886958-408e-4b6c-8315-d6669015beec%26bi%3D0%26cmpg%3D84152%26items%3D361887%26zid%3D520792%26pr%3D36248472773%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D01654f913d6d3905261ed25232f2a568%26xtr%3DeyJhc2lkIjoxNDA0OCwicHJvZmlsZWlkIjoiYTc4ODY5NTgtNDA4ZS00YjZjLTgzMTUtZDY2NjkwMTViZWVjIn0%253D%26sspz%3D2027992%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Ffiatocity.vn%252F%253Futm_source%253Dadmicro-mac%2526utm_medium%253Dadx%2526utm_campaign%253DFiatoCity%2526utm_term%253Dtarget-PC%2526utm_content%253D%255Bdomainsite%255D&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_520792_0_361887&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dthanhnien.vn%252Fpho-chu-tich-xa-doi-8-trieu-dong-cua-dan-de-lam-giay-khai-sinh-185231114150544153.htm%26z%3D520792%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699955440244%26dgid%3D01654f913d6d3905261ed25232f2a568%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D1%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D361887"
                    frameborder="0" scrolling="no" width="300" height="600" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" module>
.header-ads {
    margin: 0 auto;
    width: max-content;
    margin-top: 20px;
}

.main {
    max-width: 1140px;
    background-color: white;
    margin: 0 auto;

    .container {
        padding: 20px;
        padding-bottom: 0;
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 40px;

        &__left {}

        &__right {
            position: relative;
        }
    }

    .cate {
        display: flex;
        justify-content: space-between;

        h3 {
            font-size: 16px;
            color: #2d67ad;
            text-transform: uppercase;
        }

        span {
            font-size: 12px;
            color: #555555;
        }
    }

    .main-desc {
        color: #404040;
        font-size: 16px;
        line-height: 26px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .content {
        &-title {
            margin: 20px 0;
            color: #2a2a2a;
            font-size: 30px;
            line-height: 38px;
        }

        .author {
            display: flex;
            justify-content: space-between;
            padding-bottom: 15px;
            border-bottom: 1px solid #e2e2e2;
            margin-bottom: 20px;

            &__left {
                display: flex;
                gap: 10px;

                &-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 99px;
                    object-position: center;
                }

                &-name {
                    font-size: 15px;
                    color: #2d67ad;
                    font-weight: bold;
                    text-transform: capitalize;
                }
            }

            &__right {
                display: flex;
                align-items: center;
                color: #447ec5;
                gap: 7px;

                .icon {
                    width: 20px;
                    height: 20px;
                }

                a {
                    font-size: 12px;
                    text-decoration: underline;
                }
            }
        }

        .main-content {
            margin-top: 20px;

            p {
                color: #505050;
                font-size: 16px;
                line-height: 28px;
            }

            img {
                width: 100%;
            }

            &>*+* {
                margin-top: 16px;
            }
        }
    }

    .share-social {
        display: flex;
        align-items: center;
        gap: 10px;

        .link {
            display: block;
            border: 1px solid #e2e2e2;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            position: relative;

            &:hover {
                background-color: #2d67ad;
            }
        }

        .icon {
            background-repeat: no-repeat;
            background-size: cover;
            height: 14px;
            width: 14px;
            padding: 6px;
            display: block;
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
        }

        .facebook {
            .icon {
                background-image: url(https://static.vnncdn.net/v1/icon/icon-share-link-facebook.svg);
            }

            &:hover {
                .icon {
                    background-image: url(https://static.vnncdn.net/v1/icon/icon-share-link-facebook-white.svg);
                }
            }
        }

        .zalo {
            .icon {
                width: 35px;
                height: 35px;
                background-image: url(https://static.vnncdn.net/v1/icon/zalo-unactive-1.svg);
            }

            &:hover {
                .icon {
                    background-image: url(https://static.vnncdn.net/v1/icon/vnn/zalo-primary-active.svg);
                }
            }
        }

        .email {
            .icon {
                background-image: url(https://static.vnncdn.net/v1/icon/icon-share-link-email.svg);
            }

            &:hover {
                .icon {
                    background-image: url(https://static.vnncdn.net/v1/icon/icon-share-link-email-white.svg);
                }
            }
        }

        .share {
            .icon {
                background-image: url(https://static.vnncdn.net/v1/icon/icon-link-share-copy-link.svg);
            }

            &:hover {
                .icon {
                    background-image: url(https://static.vnncdn.net/v1/icon/icon-link-share-copy-link-white.svg);
                }
            }
        }

        .bookmark {
            .icon {
                background-image: url(https://static.vnncdn.net/v1/icon/icon-share-link-bookmark.svg);
            }

            &:hover {
                .icon {
                    background-image: url(https://static.vnncdn.net/v1/icon/icon-share-link-bookmark-white.svg);
                }
            }
        }
    }

    .news-suggest {
        position: sticky;
        top: 65px;
        margin-top: 20px;

        .heading {
            text-transform: uppercase;
            padding-bottom: 7px;
            border-bottom: 1px solid #add2ff;
            color: #2d67ad;
            font-size: 18px;
            margin-bottom: 20px;
        }

        .news {
            &>*+* {
                margin-top: 20px;
            }
        }

        .btn-back-to-home {
            background: none;
            border: 1px solid #2d67ad;
            border-radius: 50px;
            color: #2d67ad;
            cursor: pointer;
            font-size: 12px;
            padding: 5px 15px;
            font-weight: bold;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }

        .icon-back {
            height: 24px;
            width: 24px;
        }
    }

    .related-news {
        border-top: 1px solid #add2e1;
        padding: 20px 0;

        ul {
            padding-left: 20px;
            list-style: none;

            &>*+* {
                margin-top: 10px;
            }

            li {
                display: list-item;
                list-style-type: square;

                &::marker {
                    color: #2d67ad;
                }

                a:hover {
                    color: #2d67ad;
                }
            }
        }
    }

    .btn-comment {
        background-color: #2d67ad;
        border: 1px solid #2d67ad;
        border-radius: 50px;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        padding: 7px 15px;
        font-weight: bold;
    }

    .ads-right {
        position: sticky;
        top: 65px;
    }

    .ads-bottom {
        display: flex;
        justify-content: space-evenly;
        margin: 20px 0;
    }

    .title-primary {
        font-size: 18px;
        border-bottom: 1px solid #add2ff;
        color: #2d67ad;
        padding-bottom: 7px;
        text-transform: uppercase;
        margin-top: 20px;
    }

    .articles-list {
        padding-top: 20px;

        &>*+* {
            margin-top: 20px;
        }
    }
}
</style>