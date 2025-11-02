<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { homePageLoadAnimation } from '@/assets/js/customAnimations'
import { gsap } from 'gsap'
import HeroSection from '@/components/home/HeroSection.vue'
import ObjectiveSection from '@/components/home/ObjectiveSection.vue'
import WorkSection from '@/components/home/WorkSection.vue'
import TeamSection from '@/components/home/TeamSection.vue'
import { useSEO } from '@/composables/useSEO'

// SEO Configuration for Home Page
useSEO({
  title: 'Innovative Research',
  description: 'Driven by Curiosity, Guided by Science. The Beug Lab investigates the molecular mechanisms underlying human disease to identify new therapeutic strategies for cancer and immune disorders.',
  path: '/',
  image: '/logo.png'
})

// Add ref to track if component is still mounted
const isMounted = ref(false)
let homePageAnimationCleanup = null

onMounted(async () => {
  isMounted.value = true
  homePageAnimationCleanup = homePageLoadAnimation()
})

onBeforeUnmount(() => {
  isMounted.value = false

  if (homePageAnimationCleanup) {
    homePageAnimationCleanup()
  }

  if (window.dragToScrollTimeout) {
    clearTimeout(window.dragToScrollTimeout)
  }

  if (window.animationFrameId) {
    cancelAnimationFrame(window.animationFrameId)
  }

  gsap.killTweensOf('#hero-heading h1 div, #mobile-heading, #hero-c2a')
})
</script>

<template>
  <div id="main-content" class="main-content clickable">
    <HeroSection />
    <ObjectiveSection />
    <WorkSection />
    <TeamSection />
  </div>
</template>
<style scoped></style>
