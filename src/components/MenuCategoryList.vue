<script setup lang="ts">

</script>

<template>
    <div :class="[$style.categoryList]">
        <a href="/blog?cat=style" :class="[$style.categoryItem, $style.style]">Style</a>
        <a href="/blog?cat=fashion" :class="[$style.categoryItem, $style.fashion]">Fashion</a>
        <a href="/blog?cat=food" :class="[$style.categoryItem, $style.food]">Food</a>
        <a href="/blog?cat=culture" :class="[$style.categoryItem, $style.culture]">Culture</a>
        <a href="/blog?cat=coding" :class="[$style.categoryItem, $style.coding]">Coding</a>
        <a href="/blog?cat=travel" :class="[$style.categoryItem, $style.travel]">Travel</a>
    </div>
</template>

<style module>
.travel {
    background-color: #ff7857;
}

.culture {
    background-color: #ffb14f;
}

.food {
    background-color: #7fb881;
}

.fashion {
    background-color: #ff7887;
}

.coding {
    background-color: #775aec;
}

.culture {
    background-color: #ffb14f;
}

.categoryList {
    margin-top: 35px;
    margin-bottom: 60px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.categoryItem {
    padding: 10px 25px;
    border-radius: 10px;
    font-size: 14px;
}

.style {
    background-color: #57c4ff31;
}
</style>