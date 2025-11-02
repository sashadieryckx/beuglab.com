<script setup>
import PubmedPublications from '@/components/PubmedPublications.vue'

// SEO Configuration
import { useSEO } from '@/composables/useSEO'
useSEO({
  title: 'Publications',
  description: 'Browse the Beug Lab scientific publications featuring peer-reviewed research articles on cancer biology, cell death mechanisms, immune responses, and therapeutic development published in leading journals.',
  path: '/publications',
  image: '/logo.png'
})
</script>
<template>
  <div id="main-content" class="main-content df-pad">
    <h1>Publications</h1>
    <PubmedPublications></PubmedPublications>
  </div>
</template>
<style scoped>
#main-content {
  position: relative;
  min-height: 100vh;
  padding-bottom: 4em;
}
#main-content h1 {
  position: relative;
  color: var(--font-color-main);
  font-size: 2rem;
  padding-top: 2em;
  text-align: center;
  text-transform: uppercase;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  #main-content h1 {
    font-size: 3em;
    padding-top: 2em;
    padding-bottom: 0.5em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content h1 {
    font-size: 6em;
    padding-top: 1em;
  }
}
</style>
