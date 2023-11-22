<script setup lang="ts">
import { reactive, ref } from 'vue';
import Pagination from '../components/Pagination.vue'
import useApi from '../custom-hook/useAPI';
import Repository from '../repositories/repository';
import PostRepository from '../repositories/postRepository';
import { useRoute } from 'vue-router';
import VerticalPost from '../components/post/VerticalPost.vue'
import HorizontalPost from '../components/post/HorizontalPost.vue';
import VerticalPostLoading from '../components/loading/post/VerticalPostLoading.vue';
import HorizontalPostLoading from '../components/loading/post/HorizontalPostLoading.vue';

interface PageData {
    page: number;
    limit: number;
    categoryId: string;
}

const pageData: PageData = reactive({
    page: 0,
    limit: 10,
    categoryId: "",
})

const route = useRoute();

pageData.categoryId = route.query.id as string;

const formatTitle = () => {
    const categoryTitle = (route.params.slug as string).split('-').join(' ');
    categoryTitle[0].toUpperCase();

    return categoryTitle[0].toUpperCase() + categoryTitle.slice(1);
}

const { data, loading, error } = useApi([pageData], PostRepository.getPostsByCategory, pageData)

const handlePageChange = (page: number) => {
    pageData.page = page - 1;
    const titleCmp = document.getElementById('title');
    if (titleCmp) {
        const y = titleCmp.getBoundingClientRect().top + window.scrollY - 65;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

</script>

<template>
    <div :class="$style['header-ads']">
        <iframe
            src="https://media.yomedia.vn/2023/11/aiken-q3/masthead-pc-tvc/index.html?pid=00c3ef10e0984e2a8aa2ce484304257d&aid=f9eaffb8f27f4900afd4a1865405e09a&fid=699a597fa485465fa38380f18b9f605b&advId=2f5576e9954248b3a9acb8e73bc91cad&campId=ca845a09a8aa4d92801ef688a76b5328&pubId=0a3a9b6c78c443a6b36498a73171c947&chanId=3d58e13cbef3493682fe6107ac13e262&clk=https%3A%2F%2Fc.lazada.vn%2Ft%2Fc.0EmAPs%3Fintent%3Dfalse%26fallback%3Dtrue%26url%3Dhttps%253A%252F%252Fwww.lazada.vn%252Fshop%252Faiken"
            width="970" height="250" frameborder="0" scrolling="0" />
    </div>
    <div :class="$style.container">
        <h1 id="title" :class="$style.title">{{ formatTitle() }}</h1>
        <div :class="$style['posts-wrap']">
            <div :class="$style.posts">
                <div v-if="pageData.page === 0" :class="$style.topStory">
                    <div :class="$style['story-1st']">
                        <VerticalPostLoading v-if="loading" size="large" />
                        <VerticalPost v-if="data && !loading" size="large" :post="data.data[0]" />
                    </div>
                    <VerticalPostLoading v-if="loading" v-for="i in 5" />
                    <VerticalPost v-if="data && !loading" title-bold size="medium" v-for="post in data.data.slice(1, 6)"
                        :post="post" />
                </div>
                <HorizontalPostLoading v-if="loading" size="large" v-for="i in 6" />
                <HorizontalPost v-if="data && !loading && pageData.page === 0" v-for="post in data.data.slice(6)"
                    :post="post" size="large" />
                <HorizontalPost v-if="data && !loading && pageData.page !== 0" v-for="post in data.data" :post="post"
                    size="large" />

                <Pagination v-if="data" :count="Math.round(data.total / pageData.limit)" @page-change="handlePageChange" />
            </div>
            <div :class="$style['group-ads']">
                <div :class="$style.ads">
                    <iframe width="300" height="250" frameborder="0" scrolling="0"
                        src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-13/oanhdoankim/300x250_t11_29bo1/300x250_t11_29bo1/300x250_t11_29bo1.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fkenh14.vn%252F%26rid%3Dba1f2885-3171-4e3a-87bf-1c9a266f3a37120-655cc5cf%26sspb%3D1680%26sspr%3D0.0724%26lsn%3D1700578764901%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3D1dcca6a2-c6d3-4c05-9d95-4592ef40f304%26bi%3D0%26cmpg%3D84204%26items%3D362201%26zid%3D9984%26pr%3D36235561033%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D221638039794c8a2b43f03cc5d6007e1%26xtr%3DeyJhc2lkIjo5NTgsInByb2ZpbGVpZCI6IjFkY2NhNmEyLWM2ZDMtNGMwNS05ZDk1LTQ1OTJlZjQwZjMwNCJ9%26sspz%3D255%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fwww.vib.com.vn%252Fvn%252Fpromotion%252Fdetail%253FpromotionId%253D4361868%2526name%253DTang-ve-concert-The-Masked-Singer-2023-khi-chuyen-tien-quoc-te-online-tren-MyVIB%2526utm_source%253DAdmicro_AdX%2526utm_campaign%253DAdX%2526utm_content%253Dkenh14.vn&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_9984_0_362201&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dkenh14.vn%252F%26z%3D9984%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1700578764901%26dgid%3D221638039794c8a2b43f03cc5d6007e1%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D362201" />
                    <iframe width="300" height="250" frameborder="0" scrolling="0"
                        src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-10-19/anhnguyendoanle/300x250_T10_45_web/300x250_T10_45_web/300x250_T10_45_web.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fkenh14.vn%252F%26rid%3Da5025b5d-8b2a-461b-9e51-5eca2fdaaf83120-655cc5cf%26sspb%3D1540%26sspr%3D0.0663%26lsn%3D1700578764901%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3D1dcca6a2-c6d3-4c05-9d95-4592ef40f304%26bi%3D0%26cmpg%3D84407%26items%3D363381%26zid%3D9985%26pr%3D36352672190%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D221638039794c8a2b43f03cc5d6007e1%26xtr%3DeyJhc2lkIjo5NTgsInByb2ZpbGVpZCI6IjFkY2NhNmEyLWM2ZDMtNGMwNS05ZDk1LTQ1OTJlZjQwZjMwNCJ9%26sspz%3D256%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fbizfly.vn%252Fgiai-phap%252Fbizfly-website.html%253Futm_source%253DBranding%2526utm_medium%253Dbanner%2526utm_campaign%253Dthang10%2526utm_term%253Dadxpc%2526utm_content%253Dwebsite&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_9985_0_363381&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dkenh14.vn%252F%26z%3D9985%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1700578764901%26dgid%3D221638039794c8a2b43f03cc5d6007e1%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D363381" />
                    <iframe :class="$style['ads-stick']" width="300" height="600" frameborder="0" scrolling="0"
                        src="//cdnstoremedia.com/adt/amt/2023/11/tpban-amt6558391073530.html?autoplay=0&url=%2F%2Flg1.logging.admicro.vn%2Fadmt%3Fdmn%3Dhttps%253A%252F%252Fkenh14.vn%252F%26rid%3Dbc91524f-65ae-4ad2-b628-a83e95b6fef9141-655d4851%26ctr%3D0%26sspb%3D40000%26sspr%3D1.699%26lsn%3D1700612175632%26ce%3D1%26lc%3D59%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3D1dcca6a2-c6d3-4c05-9d95-4592ef40f304%26bi%3D%26cmpg%3D32828%26items%3D98701%26zid%3D485036%26pr%3D9953882521%26cid%3D-1%26pt%3Dadmt%26tp%3D12%26tpn%3D4%26alg%3D1%26dg%3D221638039794c8a2b43f03cc5d6007e1%26xtr%3DeyJhc2lkIjo5NTMsInByb2ZpbGVpZCI6IjFkY2NhNmEyLWM2ZDMtNGMwNS05ZDk1LTQ1OTJlZjQwZjMwNCJ9%26sspz%3D2343%26cov%3D1%26re%3Dhttps%253A%252F%252Fwww.facebook.com%252Fphoto%252F%253Ffbid%253D727143906113800%2526set%253Da.713038024191055&vast=%2F%2Fcdnstoremedia.com%2Fadt%2Fcpc%2Fcpm7k%2Fvastfile%2F98701.xml%3Ft%3D923239&admid=adnzone_485036_0_98701&temp=24&loc=59&weath=11" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.header-ads {
    margin: 0 auto;
    width: max-content;
    margin-top: 20px;
}

.container {
    max-width: 1140px;
    background-color: #fff;
    margin-left: auto;
    margin-right: auto;

    .posts-wrap {
        padding: 20px;
        display: flex;
        gap: 40px;

        .posts {
            flex-grow: 1;

            &>*+* {
                margin-top: 20px;
            }
        }

        .group-ads {
            width: 300px;
            flex-shrink: 0;
        }

        .topStory {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #e2e2e2;

            .story-1st {
                grid-row: 1/3;
                grid-column: 1/3;
            }
        }
    }
}

.title {
    color: #2d67ad;
    font-size: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e2e2;
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
}

.ads {
    height: 100%;

    &>*+* {
        margin-top: 15px;
    }

    &-stick {
        position: sticky;
        top: 65px;
    }
}
</style>