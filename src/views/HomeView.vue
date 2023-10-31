<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import Feature from '../components/Feature.vue'
import CategoryList from "../components/CategoryList.vue"
import CardList from "../components/CardList.vue"
import Menu from '../components/Menu.vue'

</script>

<template>
  <main :class="[$style.container]">
    <Feature />
    <CategoryList />
    <div :class="[$style.content]">
      <CardList />
      <Menu />
    </div>
  </main>
</template>

<style module>
.container {}

.content {}
</style>
