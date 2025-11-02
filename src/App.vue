<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import Contact from './components/ContactForm.vue'
import { homeSpline, cleanupHomeSpline } from './assets/js/spline.js'
// Gsap
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// Lenis Smooth Scroll Configuration
import { VueLenis, useLenis } from 'lenis/vue'
// Vue
import { useRoute } from 'vue-router'
import { watch, nextTick, onMounted, onUnmounted } from 'vue'
// Meta Head
import { useSEO, organizationSchema } from '@/composables/useSEO'
// Stores ticker function for proper cleanup
let rafCallback = null
let resizeObserver = null
let contactFormCleanup = null

// Global Animations
import { ContactForm } from './assets/js/customAnimations'
// Global Utils
import { useReloadOnBreakpointChange } from './assets/js/utils'
useReloadOnBreakpointChange()

const lenis = useLenis(() => {
  // ?
})
function updateLenis() {
  lenis.value?.resize()
}

const resizeHandler = () => {
  updateLenis()
  ScrollTrigger.refresh()
}

onMounted(() => {
  lenis.value.on('scroll', ScrollTrigger.update())

  rafCallback = (time) => {
    lenis.value?.raf(time * 1000)
  }

  resizeObserver = new ResizeObserver(resizeHandler)
  resizeObserver.observe(document.body)

  window.addEventListener('resize', resizeHandler)

  // Initialize contact form animation
  contactFormCleanup = ContactForm()

  homeSpline()

  const loaderTimeline = gsap.timeline({
    ease: 'power2.inOut',
    onComplete: () => {
      document.getElementById('loader').style.display = 'none'
    },
  })
  loaderTimeline.from(
    '#logomark-wrapper',
    {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.inOut',
    },
    0,
  )
  loaderTimeline.to(
    '#logomark-wrapper',
    {
      opacity: 0,
      scale: 1.2,
      duration: 0.5,
      filter: 'blur(10px)',
      ease: 'power2.inOut',
    },
    1,
  )
  loaderTimeline.to(
    '#loader',
    {
      duration: 1,
      y: '-100%',
      ease: 'power2.inOut',
    },
    1.5,
  )
})

// Cleanup function
onUnmounted(() => {
  if (lenis.value) {
    lenis.value.off('scroll', ScrollTrigger.update())
  }
  if (rafCallback) {
    gsap.ticker.remove(rafCallback)
    rafCallback = null
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (contactFormCleanup) {
    contactFormCleanup()
    contactFormCleanup = null
  }
  // Clean up Spline WebGL resources
  cleanupHomeSpline()

  window.removeEventListener('resize', resizeHandler)
})

const route = useRoute()
watch(
  () => route.path,
  async (newPath, oldPath) => {
    await nextTick()

    if (newPath !== oldPath) {
      // Only reset body overflow if contact form isn't active
      const contactWrapper = document.querySelector('#contact-wrapper')
      if (!contactWrapper || !contactWrapper.classList.contains('active')) {
        document.body.style.overflow = ''
      }

      setTimeout(() => {
        if (lenis.value) {
          lenis.value.resize()
          lenis.value.scrollTo(0, {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          })

          setTimeout(() => {
            ScrollTrigger.refresh(true)
            lenis.value.resize()
          }, 50)
        } else {
          // Fallback smooth scroll for when Lenis isn't available
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  },
)

// Set up global SEO defaults with organization schema
useSEO({
  title: '',
  description: 'The Beug Lab investigates the molecular mechanisms underlying human disease to identify new therapeutic strategies. Led by Dr. Shawn Beug, the lab bridges fundamental research with clinical application to improve health outcomes.',
  path: '/',
  image: '/logo.png',
  schema: organizationSchema
})
</script>
<template>
  <VueLenis
    root
    :options="{
      duration: 1.25,
      lerp: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      smoothTouch: true,
      autoResize: true,
      autoRaf: true,
      anchors: false,
      infinite: false,
    }"
  >
    <div id="app">
      <div id="loader">
        <div id="logomark-wrapper">
          <h6>Welcome.</h6>
        </div>
      </div>
      <div id="spline">
        <canvas id="home-spline"></canvas>
      </div>
      <header>
        <NavBar />
      </header>
      <router-view v-slot="{ Component }">
        <transition :css="true" mode="out-in" name="v">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
      <div id="contact-container">
        <div id="contact-wrapper">
          <Contact />
        </div>
      </div>
      <SiteFooter />
    </div>
  </VueLenis>
</template>

<style scoped>
/* TRANSITIONS */
.v-enter-from {
  filter: blur(10px);
  opacity: 0;
}
.v-leave-to {
  filter: blur(10px);
  opacity: 0;
}
.v-enter-active {
  transition: all 1s ease-out;
}
.v-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
header {
  z-index: 9;
}
#loader {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #e9e9e9;
}
#logomark-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
}
#logomark-wrapper h6 {
  color: #222222;
  font-size: 2rem;
}
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100%;
  transition: all 0.5s ease;
  will-change: height;
}
#spline {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: auto;
  touch-action: none;
}

#spline canvas {
  pointer-events: auto;
  touch-action: none;
}
#contact-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 14;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
#contact-wrapper {
  width: 100vw;
  height: 0%;
  background-color: #e9e9e9;
  visibility: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  pointer-events: none;
  position: relative;
}

#contact-wrapper.active {
  pointer-events: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
