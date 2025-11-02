<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import sanity, { urlFor } from '../assets/js/sanity.js'

// Gallery state
const currentImageIndex = ref(0)
const isTransitioning = ref(false)
const images = ref([])
const isLoading = ref(true)

// Fetch gallery images from Sanity
const fetchGalleryImages = async () => {
  try {
    const query = `*[_type == "galleryImage"] | order(order asc) {
      _id,
      title,
      description,
      image,
      order,
      featured
    }`

    const galleryData = await sanity.fetch(query)

    images.value = galleryData.map((item, index) => ({
      id: item._id,
      src: urlFor(item.image).width(1200).height(800).fit('max').auto('format').url(),
      thumbnail: urlFor(item.image).width(200).height(150).fit('crop').auto('format').url(),
      alt: item.image.alt || item.title || `Gallery image ${index + 1}`,
      title: item.title || `Gallery image ${index + 1}`,
      description: item.description || '',
      order: item.order || index,
      featured: item.featured || false,
    }))
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    // Fallback to empty array if fetch fails
    images.value = []
  } finally {
    isLoading.value = false
  }
}

// Navigation functions
// Store timeout IDs for cleanup
let transitionTimeoutId = null

const goToImage = (index) => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentImageIndex.value = index

  // Clear existing timeout
  if (transitionTimeoutId) {
    clearTimeout(transitionTimeoutId)
  }

  transitionTimeoutId = setTimeout(() => {
    isTransitioning.value = false
    transitionTimeoutId = null
  }, 300)
}

const nextImage = () => {
  if (images.value.length === 0) return
  const nextIndex = (currentImageIndex.value + 1) % images.value.length
  goToImage(nextIndex)
}

const prevImage = () => {
  if (images.value.length === 0) return
  const prevIndex =
    currentImageIndex.value === 0 ? images.value.length - 1 : currentImageIndex.value - 1
  goToImage(prevIndex)
}




// Auto-play functionality (optional)
const autoPlay = ref(false)
const autoPlayInterval = ref(null)

const startAutoPlay = () => {
  if (autoPlayInterval.value) return
  autoPlayInterval.value = setInterval(nextImage, 4000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const toggleAutoPlay = () => {
  autoPlay.value = !autoPlay.value
  if (autoPlay.value) {
    startAutoPlay()
  } else {
    stopAutoPlay()
  }
}

// Lifecycle
onMounted(() => {
  // Fetch gallery images
  fetchGalleryImages()
})

onUnmounted(() => {
  stopAutoPlay()

  // Clean up transition timeout
  if (transitionTimeoutId) {
    clearTimeout(transitionTimeoutId)
    transitionTimeoutId = null
  }
})

// SEO Configuration
import { useSEO } from '@/composables/useSEO'
useSEO({
  title: 'Gallery',
  description: 'Explore the Beug Lab gallery showcasing our team activities, events, and laboratory culture. Discover what we get up to outside the lab and see the people behind the research.',
  path: '/gallery',
  image: '/logo.png'
})
</script>

<template>
  <div class="gallery-container main-content">
    <div class="gallery-header df-pad">
      <h1>Gallery</h1>
      <p>Here is what we get up to outside the lab!</p>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading gallery images...</p>
    </div>

    <!-- Empty state -->
    <div v-else-if="images.length === 0" class="empty-container">
      <p>No gallery images available at the moment.</p>
    </div>

    <!-- Gallery content -->
    <div v-else class="carousel-wrapper clickable">
      <div class="carousel-container">
        <button
          class="nav-button nav-prev"
          @click="prevImage"
          :disabled="isTransitioning || isLoading || images.length === 0"
          aria-label="Previous image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <button
          class="nav-button nav-next"
          @click="nextImage"
          :disabled="isTransitioning || isLoading || images.length === 0"
          aria-label="Next image"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
        <div class="image-container">
          <div
            class="image-track"
            :style="{
              transform: `translateX(-${currentImageIndex * (100 / images.length)}%)`,
              width: `${images.length * 100}%`,
            }"
          >
            <div
              v-for="(image, index) in images"
              :key="image.id"
              class="image-slide"
              :style="{ width: `${100 / images.length}%` }"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                :loading="Math.abs(index - currentImageIndex) <= 2 ? 'eager' : 'lazy'"
                class="gallery-image"
              />
            </div>
          </div>
        </div>
        <div class="gallery-controls">
          <div class="image-counter">
            <p>{{ currentImageIndex + 1 }} / {{ images.length }}</p>
          </div>

          <div class="control-buttons">
            <button class="control-btn" @click="toggleAutoPlay" :class="{ active: autoPlay }">
              {{ autoPlay ? 'Pause' : 'Play' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Thumbnail navigation -->
      <div class="thumbnail-nav">
        <div class="thumbnail-track">
          <button
            v-for="(image, index) in images"
            :key="`thumb-${image.id}`"
            class="thumbnail"
            :class="{ active: index === currentImageIndex }"
            @click="goToImage(index)"
          >
            <img
              :src="image.thumbnail || image.src"
              :alt="`Thumbnail ${index + 1}`"
              loading="lazy"
            />
          </button>
        </div>
      </div>

      <!-- Dots indicator (alternative to thumbnails on mobile) -->
      <div class="dots-indicator">
        <button
          v-for="(image, index) in images"
          :key="`dot-${image.id}`"
          class="dot"
          :class="{ active: index === currentImageIndex }"
          @click="goToImage(index)"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  min-height: 100vh;
  padding-bottom: 2rem;
}

.gallery-header {
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
}

.gallery-header h1 {
  color: var(--nero);
  margin-bottom: 0.5rem;
  font-size: clamp(2rem, 5vw, 3.5rem);
  text-transform: uppercase;
}

.gallery-header p {
  color: var(--font-color-hover);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Loading and empty states */
.loading-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--nero);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-container p,
.empty-container p {
  color: var(--font-color-hover);
  font-size: 1.1rem;
  margin: 0;
}

.carousel-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.carousel-container {
  position: relative;
  background: var(--blanco);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.image-container {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
}

.image-track {
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-slide {
  position: relative;
  height: 100%;
  flex-shrink: 0;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 2rem 1.5rem 1.5rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.image-slide:hover .image-overlay {
  transform: translateY(0);
}

.image-overlay h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: white;
}

.image-overlay p {
  font-size: 0.9rem;
  opacity: 0.9;
  color: white;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: translateY(-50%);
}

.nav-prev {
  left: 1rem;
}

.nav-next {
  right: 1rem;
}

.gallery-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--blanco);
  border-top: 1px solid #eee;
}

.image-counter {
  font-weight: 500;
  color: var(--nero);
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--nero);
  background: transparent;
  color: var(--nero);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.control-btn:hover,
.control-btn.active {
  background: var(--nero);
  color: var(--blanco);
}

.thumbnail-nav {
  margin-bottom: 1rem;
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--nero) transparent;
}

.thumbnail-track {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  min-width: max-content;
}

.thumbnail {
  flex: 0 0 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: none;
  padding: 0;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail:hover {
  border-color: var(--nero);
  transform: scale(1.05);
}

.thumbnail.active {
  border-color: var(--nero);
  box-shadow: 0 0 0 2px var(--nero);
}

.dots-indicator {
  display: none;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover,
.dot.active {
  background: var(--nero);
  transform: scale(1.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery-header {
    padding-top: 4rem;
    padding-bottom: 1rem;
  }
  .carousel-wrapper {
    padding: 0 0.5rem;
  }
  .image-container {
    height: 50vh;
    min-height: 300px;
  }
  .nav-button {
    width: 40px;
    height: 40px;
  }
  .nav-prev {
    left: 0.5rem;
  }
  .nav-next {
    right: 0.5rem;
  }
  .gallery-controls {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .thumbnail-nav {
    display: none;
  }

  .dots-indicator {
    display: flex;
    overflow-x: auto;
    padding: 1rem 0.5rem;
  }

  .image-overlay {
    padding: 1rem;
  }

  .image-overlay h3 {
    font-size: 1rem;
  }

  .image-overlay p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .image-container {
    height: 40vh;
    min-height: 250px;
  }

  .nav-button {
    width: 35px;
    height: 35px;
  }

  .dots-indicator {
    max-width: 100%;
  }

  .dot {
    width: 12px;
    height: 12px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .image-track,
  .nav-button,
  .thumbnail,
  .dot,
  .control-btn,
  .image-overlay {
    transition: none;
  }
}

/* Focus styles for keyboard navigation */
.nav-button:focus,
.thumbnail:focus,
.dot:focus,
.control-btn:focus {
  outline: 2px solid var(--nero);
  outline-offset: 2px;
}

@media (min-width: 1280px) {
  .gallery-header {
    padding-top: 4rem;
  }
  .gallery-header p {
    font-size: 1.5rem;
  }
  .gallery-header h1 {
    font-size: 4rem;
  }
}
</style>
