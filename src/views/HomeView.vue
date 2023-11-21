<script setup lang="ts">
import HorizontalPost from "../components/post/HorizontalPost.vue"
import VerticalPost from '../components/post/VerticalPost.vue'
import CategoryBox from "../components/CategoryBox.vue"
import PostRepository from "../repositories/postRepository";
import HorizontalPostLoading from '../components/loading/post/HorizontalPostLoading.vue';
import VerticalPostLoading from '../components/loading/post/VerticalPostLoading.vue';
import useApi from '../custom-hook/useAPI';
import CategoryBoxLoading from '../components/loading/category/CategoryBoxLoading.vue'

const { data: topStories, loading: topStoriesLoading, error: errorTopStories } = useApi([], PostRepository.getTopStories)
console.log("topStoriesLoading: ", topStoriesLoading);
const { data: postsCateLatest, loading: postscateLoading, error: errorPostsCate } = useApi([], PostRepository.getLatestPostAllCate);

</script>

<template>
  <div :class="$style['header-ads']">
    <iframe marginwidth="0" width="1366" allowtransparency="true" marginheight="0" hspace="0" vspace="0" frameborder="0"
      scrolling="no"
      src="https://v-cdn.vietnamnetad.vn/html/2023/11/1920x250_0511/1920x250_0511.html?wd=1366?clickVNN=https://log.vads.net.vn/ad/click-tracking?action_name=o@c6GNpucl1dXzVYahCbv3_@$_2kHxWbFaz89G8SvTRbVzAnJZYqMYhWgN2ShANXih@4skmhjq6UCBakxcYFZZNed9yW8u8H_@$_06mwAaGC1UxpRw6Y3FuVvKdiUAx8FI42Q2YijZx1KTYMkKnAiR7s4rzSLyjHoiifNxX0ETHlXiOX4JWAs7G5_@$__@$_5UoXsnjHujT_@$_n8A82azDJhFImO9rxsRBHDu8MqVkx@kumn_@$_TAixUpX1sybhms32aaFYRR9ZPNmBwOFJ7Bew4F5BHVTtjqWa4Z7dfKpWhsKCX516rUdQSqZqNO7nj2TTih3hNAsMhDtfi_@$_5QDyYb2DS8GJeczyteSdGBSC_@$_30SXcwnrvJ3TfeU4aOf@si9anoaFUiym9oorO9ONKBEhUfc_@$_IRlXjdHC9BkmlVXjZ74zFyvvWPt6lCP45ipt7gxmuUkaGtRk1asvSXGRwtvKNSRbCYugMuVloBmXvbEAldZcoTmOZmfTRSPa0=" />
  </div>

  <main :class="$style.main">
    <section :class="$style.sectionTopStory">
      <div :class="$style.sectionTopStory__left">
        <template v-if="topStoriesLoading">
          <HorizontalPostLoading v-for="i in 5" />
        </template>

        <HorizontalPost v-if="topStories && topStories.length > 0" v-for="post in topStories.slice(0, 6)" :post="post" />
      </div>
      <div :class="$style.sectionTopStory__center">
        <div v-if="topStoriesLoading">
          <VerticalPostLoading size="large" />

          <div :class="$style.topStory_2nd">
            <VerticalPostLoading v-for="i in 2" />
          </div>
        </div>

        <div v-if="topStories && topStories.length > 0">
          <VerticalPost :post="topStories[6]" size="large" />

          <div :class="$style.topStory_2nd">
            <VerticalPost :post="topStories[7]" size="medium" />
            <VerticalPost :post="topStories[8]" size="medium" />
          </div>
        </div>
      </div>
      <div :class="$style.sectionTopStory__right">
        <iframe
          src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-13/thuongphamthuy/300x600-2/300x600/300x600.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252Fgia-usd-hom-nay-14112023-ngan-hang-dong-loat-tang-tro-lai-18523111408033469.htm%26rid%3D12a36eb6-8dd4-4692-a99d-8eee84a91956141-6552d8ac%26sspb%3D200000%26sspr%3D0.0001%26lsn%3D1699928222092%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3Da7886958-408e-4b6c-8315-d6669015beec%26bi%3D0%26cmpg%3D84196%26items%3D362133%26zid%3D520755%26pr%3D36285311322%26cid%3D-1%26tp%3D12%26tpn%3D4%26alg%3D1102%26dg%3D01654f913d6d3905261ed25232f2a568%26xtr%3DeyJhc2lkIjoxNDA0MSwicHJvZmlsZWlkIjoiYTc4ODY5NTgtNDA4ZS00YjZjLTgzMTUtZDY2NjkwMTViZWVjIn0%253D%26sspz%3D2027980%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253DIgvKZALPkg4&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_520755_0_362133&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dthanhnien.vn%252Fgia-usd-hom-nay-14112023-ngan-hang-dong-loat-tang-tro-lai-18523111408033469.htm%26z%3D520755%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699928222092%26dgid%3D01654f913d6d3905261ed25232f2a568%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D1%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D362133"
          frameborder="0" scrolling="no" width="300" height="600" />
      </div>
      <div :class="$style.sectionTopStory__bottom">
        <template v-if="topStoriesLoading">
          <VerticalPostLoading v-for="n in 5" />
        </template>
        <VerticalPost v-if="topStories && topStories.length > 0" v-for="post in topStories.slice(9)" :post="post"
          size="medium" />
      </div>
    </section>

    <section :class="$style['center-ads']">
      <iframe
        src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-08/thuongphamthuy/300x250/300x250/300x250.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3D070c1ab1-6398-48ee-8229-2f7a3ab3f0df142-6552ca2f%26sspb%3D16730%26sspr%3D0.0001%26lsn%3D1699924523671%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3Da7886958-408e-4b6c-8315-d6669015beec%26bi%3D0%26cmpg%3D84097%26items%3D361547%26zid%3D511950%26pr%3D36216194286%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D01654f913d6d3905261ed25232f2a568%26xtr%3DeyJhc2lkIjo1MjE5LCJwcm9maWxlaWQiOiJhNzg4Njk1OC00MDhlLTRiNmMtODMxNS1kNjY2OTAxNWJlZWMifQ%253D%253D%26sspz%3D2013887%26adc_cpa%3D1%26cov%3D1%26re%3Dhttps%253A%252F%252Fwuling-ev.vn%252F%253Futm_source%253Dadmicro%2526utm_medium%253Dadx-mix-format%2526utm_campaign%253Dwuling-nov-23&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_511950_0_361547&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dthanhnien.vn%252F%26z%3D511950%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699924523671%26dgid%3D01654f913d6d3905261ed25232f2a568%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D361547"
        frameborder="0" scrolling="no" width="300" height="250" />

      <iframe frameborder="0" scrolling="no" width="300" height="250"
        src="https://cdnstoremedia.com/adt/banners/nam2015/4043/min_html5/2023-11-13/anhnguyendoanle/300x250_T11_34/300x250_T11_34/300x250_T11_34.html?url=%2F%2Flg1.logging.admicro.vn%2Fadn%3Fdmn%3Dhttps%253A%252F%252Fthanhnien.vn%252F%26rid%3Da49f7293-e77d-4f18-8b43-983feed08024140-6552d058%26sspb%3D29340%26sspr%3D0.0001%26lsn%3D1699926097406%26ce%3D1%26lc%3D65%26cr%3D1698653440%26ui%3D839865344020392618%26uuid%3D%26profileID%3Da7886958-408e-4b6c-8315-d6669015beec%26bi%3D0%26cmpg%3D84198%26items%3D362159%26zid%3D511950%26pr%3D36281290583%26cid%3D-1%26tp%3D11%26tpn%3D4%26alg%3D1102%26dg%3D01654f913d6d3905261ed25232f2a568%26xtr%3DeyJhc2lkIjo1MjE5LCJwcm9maWxlaWQiOiJhNzg4Njk1OC00MDhlLTRiNmMtODMxNS1kNjY2OTAxNWJlZWMifQ%253D%253D%26sspz%3D2013887%26cov%3D1%26re%3Dhttps%253A%252F%252Fnhathuoclongchau.com.vn%252F%253Futm_source%253DAdmicro%2526utm_medium%253DCPC%2526utm_campaign%253DAdhoc-UT-11-2023%2526utm_term%253DNew%2526utm_content%253Dthanhnien.vn&temp=0&loc=65&weath=&autoplay=0&admid=adnzone_511950_0_362159&vast=https%3A%2F%2Fsspapi.admicro.vn%2Fssp_request%2Fvideo%3Fu%3Dthanhnien.vn%252F%26z%3D511950%26p%3D1%26w%3D650%26h%3D300%26%26lsn%3D1699926097406%26dgid%3D01654f913d6d3905261ed25232f2a568%26l%3D65%26loc%3D65%26i%3D839865344020392618%26isdetail%3D0%26pid%3D%26tags%3D5%26adstype%3D%26vtype%3D8%26vid%3D%26bannerid%3D362159" />

      <img src="https://static-cmsads.admicro.vn/cmsads/2023/11/Dien-1698998335800.jpeg" />
    </section>

    <section :class="$style.home">
      <CategoryBoxLoading v-if="postscateLoading" v-for="i in 3" />
      <CategoryBox v-if="postsCateLatest && postsCateLatest.length > 0" v-for="data in postsCateLatest"
        :posts="data.posts" :category="data.category" />
    </section>
  </main>
</template>

<style lang="scss" module>
.header-ads {
  width: 1366px;
  margin-top: 20px;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.center-ads {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
}

.main {
  max-width: 1140px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;

  .sectionTopStory {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;

    &__left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 20px;
    }

    &__center {
      flex: 1.4;
      // display: flex;
      padding: 0 30px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 15px;
        height: 100%;
        width: 1px;
        background-color: #dedede;
      }


      &::after {
        content: "";
        position: absolute;
        top: 0px;
        bottom: 0;
        right: 15px;
        height: 100%;
        width: 1px;
        background-color: #dedede;
      }

      .topStory_2nd {
        display: flex;
        gap: 15px;
        margin-top: 15px;
      }
    }

    &__right {
      width: 300px;
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    &__bottom {
      flex: 1 1 100%;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 15px;
      padding: 15px;
      margin: 20px 0;
      background-color: hsla(0, 0%, 96%, .839);
      border: 1px solid hsla(40, 17%, 93%, .4);
    }
  }

  .home {

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px 30px;
    position: relative;

    & :first-child::after {
      content: "";
      top: 0;
      position: absolute;
      bottom: 0;
      width: 1px;
      background-color: #dedede;
      left: calc(calc(calc(100% - 60px)/3) + 15px);
    }

    & :nth-child(3)::after {
      content: "";
      top: 0;
      position: absolute;
      bottom: 0;
      width: 1px;
      background-color: #dedede;
      right: calc(calc(calc(100% - 60px)/3) + 15px);
    }
  }
}
</style>
