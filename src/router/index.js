import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Team from '@/views/about/TeamView.vue'
import DrBeug from '@/views/about/DrBeugView.vue'
import GrantsAndPartners from '../views/about/GrantsAndPartnersView.vue'
import Publications from '@/views/PublicationsView.vue'
import Gallery from '@/views/GalleryView.vue'
import ImmunoDefender from '@/views/ImmunoDefenderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/about/team',
      name: 'team',
      component: Team,
    },
    {
      path: '/about/dr-beug',
      name: 'drbeug',
      component: DrBeug,
    },
    {
      path: '/about/grants-and-partners',
      name: 'grants&partners',
      component: GrantsAndPartners,
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery,
    },
    {
      path: '/gallery/immuno-defender',
      name: 'immunodefender',
      component: ImmunoDefender,
    },
  ],
})

export default router
