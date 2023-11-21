<script setup lang="ts">
import Pagination from '../components/Pagination.vue'

const handlePageChange = (page: number) => {
    console.log("page change : ", page);

}

</script>

<template>
    <div :class="$style['header-ads']">
        <iframe
            src="https://media.yomedia.vn/2023/11/aiken-q3/masthead-pc-tvc/index.html?pid=00c3ef10e0984e2a8aa2ce484304257d&aid=f9eaffb8f27f4900afd4a1865405e09a&fid=699a597fa485465fa38380f18b9f605b&advId=2f5576e9954248b3a9acb8e73bc91cad&campId=ca845a09a8aa4d92801ef688a76b5328&pubId=0a3a9b6c78c443a6b36498a73171c947&chanId=3d58e13cbef3493682fe6107ac13e262&clk=https%3A%2F%2Fc.lazada.vn%2Ft%2Fc.0EmAPs%3Fintent%3Dfalse%26fallback%3Dtrue%26url%3Dhttps%253A%252F%252Fwww.lazada.vn%252Fshop%252Faiken"
            width="970" height="250" frameborder="0" scrolling="0" />
    </div>
    <div :class="$style.container">
        <h1 :class="$style.title">Thời sự</h1>
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
}

.title {
    color: #2d67ad;
    font-size: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e2e2;
    margin-top: 10px;
}
</style>