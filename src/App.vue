<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import BaseLayout from './layout/BaseLayout.vue'
</script>

<template>
  <div class="container">
    <div class="wraper">
      <BaseLayout>
        <template #header>
          <Navbar />
        </template>

        <template #default>
          <RouterView />
        </template>

        <template #footer>
          <Footer />
        </template>
      </BaseLayout>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  background-color: var(--bg);
  color: var(--textColor);
}

.wraper {
  max-width: 1536px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 80px;
  padding-right: 80px;
}
</style>

