<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MiniGame from '@/components/MiniGame.vue'

const route = useRoute()
const gameKey = ref(0)

watch(
  () => route.fullPath,
  () => {
    gameKey.value++
  },
  { immediate: true },
)

onMounted(() => {
  if (!sessionStorage.getItem('gameLoadedOnce')) {
    sessionStorage.setItem('gameLoadedOnce', 'true')
    location.reload()
  } else {
    sessionStorage.removeItem('gameLoadedOnce')
  }
})

// SEO Configuration
import { useSEO } from '@/composables/useSEO'
useSEO({
  title: 'Immuno Defender',
  description: 'Play Immuno Defender, an educational mini-game from the Beug Lab that teaches about immune system responses and cancer biology through interactive gameplay.',
  path: '/gallery/immuno-defender',
  image: '/logo.png'
})
</script>
<template>
  <div>
    <MiniGame :key="gameKey" />
  </div>
</template>
<style scoped></style>
