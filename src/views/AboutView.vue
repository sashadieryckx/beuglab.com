<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sanity, urlFor } from '@/assets/js/sanity.js'

gsap.registerPlugin(ScrollTrigger)

// Sanity data
const aboutTitle = ref('About us.')
const aboutDescription = ref('We are interested in cancer biology with respect to understanding cell death mechanisms and immunity. In particular, we focus on a group of proteins called the Inhibitors of Apoptosis. We investigate how this group of proteins shape cancer development and regulate immune responses.')
const teamPhotoUrl = ref('../assets/content/images/teamPhoto.jpg')
const teamPhotoAlt = ref('Team Photo')

// Fetch data from Sanity
const fetchAboutData = async () => {
  try {
    const query = `*[_type == "aboutPage"][0] {
      aboutTitle,
      aboutDescription,
      teamPhoto {
        asset,
        alt
      }
    }`
    const data = await sanity.fetch(query)
    
    if (data) {
      if (data.aboutTitle) aboutTitle.value = data.aboutTitle
      if (data.aboutDescription) aboutDescription.value = data.aboutDescription
      if (data.teamPhoto) {
        if (data.teamPhoto.asset) {
          teamPhotoUrl.value = urlFor(data.teamPhoto.asset).url()
        }
        if (data.teamPhoto.alt) {
          teamPhotoAlt.value = data.teamPhoto.alt
        }
      }
    }
  } catch (error) {
    console.error('Error fetching about data:', error)
    // Keep default values if fetch fails
  }
}

onMounted(async () => {
  await fetchAboutData()
  const experienceContainerTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#experience-container',
      start: 'top 0%',
      end: '+=400%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      invalidateOnRefresh: true,
    },
  })
  experienceContainerTl.set('#about-us', {
    opacity: 1,
    delay: 2,
  })
  experienceContainerTl.to(
    '#about-us',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
    },
    0.1,
  )
  experienceContainerTl.from(
    '#h-top',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1,
      xPercent: -150,
    },
    0.4,
  )
  experienceContainerTl.from(
    '#h-bottom',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 1,
      xPercent: 150,
    },
    0.4,
  )
  experienceContainerTl.to(
    '.experience-heading',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
      scale: 3,
    },
    1.25,
  )
  experienceContainerTl.to(
    '#experience-video',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
    },
    1.5,
  )
  experienceContainerTl.to(
    '#experience-container',
    {
      opacity: 0,
      ease: 'power2.inOut',
      duration: 0.5,
    },
    1.5,
  )
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})

// SEO Configuration
import { useSEO } from '@/composables/useSEO'
useSEO({
  title: 'About',
  description: 'Learn about the Beug Lab at CHEO RI. We are interested in cancer biology with respect to understanding cell death mechanisms and immunity, focusing on the Inhibitors of Apoptosis and their role in cancer development.',
  path: '/about',
  image: '/logo.png'
})
</script>
<template>
  <div id="main-content" class="clickable">
    <div id="section-1">
      <div id="experience-container">
        <video id="experience-video" autoplay muted playsinline loop preload="auto">
          <source src="../assets/content/video/BeugLabShowreel.mp4" type="video/mp4" />
        </video>
        <div id="about-us">
          <h6>{{ aboutTitle }}</h6>
          <h6>
            {{ aboutDescription }}
          </h6>
        </div>
        <div class="experience-heading">
          <div id="h-top">
            <h1>Beug Lab</h1>
          </div>
          <div id="h-bottom">
            <h1>CHEO RI</h1>
          </div>
        </div>
      </div>
    </div>
    <div id="section-2">
      <div class="img-container">
        <img :src="teamPhotoUrl" :alt="teamPhotoAlt" />
      </div>
    </div>
  </div>
</template>

<style>
#main-content {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Only hide overflow on desktop where ScrollTrigger pinning works properly */
@media (min-width: 1280px) {
  #main-content {
    overflow: hidden;
  }
}
#section-1 {
  position: relative;
  width: 100vw;
  height: 500vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#experience-container {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--nero);
  overflow: hidden;
}
#experience-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 60%;
  scale: 1.05;
}
#about-us {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 75%;
  color: var(--blanco);
  text-align: justify;
}
#about-us :nth-child(1) {
  font-size: 2em;
  margin-bottom: 0.5em;
}
#about-us h6 {
  font-size: 1.25em;
  line-height: 1.5;
}
.experience-heading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--blanco);
  will-change: transform, opacity, scale;
}
.experience-heading h1 {
  font-size: 3em;
  line-height: 1em;
  text-transform: uppercase;
}
#section-2 {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-container img {
  position: absolute;
  width: 100%;
  max-width: 1500px;
  border-radius: 25px;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  .experience-heading h1 {
    font-size: 6em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  .experience-heading h1 {
    font-size: 8em;
  }
  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #about-us {
    width: 100%;
  }
  #about-us :nth-child(1) {
    font-size: 3em;
  }
  #about-us h6 {
    font-size: 2.5em;
    line-height: 1.5;
  }
  .experience-heading h1 {
    font-size: 9rem;
    line-height: 2.25em;
  }
  #h-top,
  #h-bottom {
    position: absolute;
  }
  #h-top {
    top: 20%;
    left: 5%;
  }
  #h-bottom {
    bottom: 20%;
    right: 5%;
  }
}
/* DESKTOP 3 [GLOBAL] */
@media (min-width: 1728px) {
  .experience-heading h1 {
    font-size: 12rem;
    line-height: 2.25em;
  }
}
/* DESKTOP 4 [GLOBAL] */
@media (min-width: 1920px) {
  .experience-heading h1 {
    font-size: 13em;
    line-height: 2em;
  }
}
/* DESKTOP 5 (4k + Larger) */
@media (min-width: 2160px) {
  #main-content {
    margin: 0 auto;
    overflow: visible;
  }
  #section-1 {
    width: 100%;
    height: 500vh;
    margin: 0 auto;
  }
  #experience-container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    border-radius: 0;
    overflow: hidden;
  }
  #experience-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 65%;
    scale: 1.02;
  }
  #about-us {
    width: 100%;
    max-width: 60%;
    padding: 4em;
  }
  #about-us :nth-child(1) {
    font-size: 4em;
    line-height: 1.2em;
    margin-bottom: 1em;
    letter-spacing: -0.02em;
  }
  #about-us h6 {
    font-size: 2.75em;
    line-height: 1.5em;
    font-weight: 300;
    text-align: justify;
    color: rgba(255, 255, 255, 0.95);
  }
  .experience-heading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--blanco);
  }
  .experience-heading h1 {
    font-size: 16em;
    line-height: 1.8em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -0.03em;
  }
  #h-top {
    top: 22%;
    left: 3%;
    position: absolute;
  }
  #h-bottom {
    bottom: 22%;
    right: 3%;
    position: absolute;
  }
  #section-2 {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    padding: 4em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      135deg,
      rgba(233, 233, 233, 0.05) 0%,
      rgba(233, 233, 233, 0.15) 100%
    );
  }
  .img-container {
    width: 100%;
    height: 90vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    position: relative;
  }
  .img-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(233, 233, 233, 0.1) 0%,
      transparent 50%,
      rgba(233, 233, 233, 0.1) 100%
    );
    pointer-events: none;
    z-index: 1;
    border-radius: 40px;
  }
  .img-container img {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: none;
    border-radius: 40px;
    object-fit: cover;
    object-position: center;
    top: auto;
    left: auto;
    transform: none;
    transition: transform 0.3s ease;
  }
  .img-container:hover img {
    transform: scale(1.02);
  }
}
</style>
