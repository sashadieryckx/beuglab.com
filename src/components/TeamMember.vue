<script setup>
import { onMounted } from 'vue'
import { useTeamStore } from '@/stores/team.js'

const teamStore = useTeamStore()
const { members, fetchTeamMembers } = teamStore

onMounted(() => {
  if (members.length === 0) fetchTeamMembers()
})

defineProps(['member'])
</script>
<template>
  <div id="team-member" v-if="member">
    <div class="member-wrapper df-pad">
      <div class="reverse">
        <div id="top-section">
          <div class="member-img-container">
            <img :src="member.headshot" :alt="member.name" class="member-img" loading="lazy" />
          </div>
          <div id="edu-links" class="clickable">
            <h6>{{ member.edu }}</h6>
            <a :href="member.linkedin">LinkedIn</a>
            <a :href="member.cheo">CHEO RI</a>
          </div>
        </div>
        <div>
          <h1 class="member-name">{{ member.name }}</h1>
          <h3 class="member-title">{{ member.title }}</h3>
        </div>
      </div>
      <p class="member-bio">{{ member.bio }}</p>
    </div>
  </div>
</template>
<style scoped>
#team-member {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  min-width: 100%;
  height: 100%;
  color: var(--font-color-main);
  will-change: height;
}
.member-img-container {
  position: relative;
  width: 100%;
  height: 55vh;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 4px 4px 10px #2222221a;
}
.member-img {
  background-color: #f8f8f8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
#top-section {
  display: grid;
  grid-template-columns: 1fr;
}
.member-name {
  text-transform: uppercase;
  font-size: 2.5em;
  line-height: 1.2em;
  padding-bottom: 0.5em;
}
.member-title {
  font-size: 1.25em;
  margin-bottom: 1.5em;
}
.member-bio {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-top: 2em;
  padding-bottom: 4em;
}
#edu-links {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 1em;
  padding-right: 1em;
  gap: 0.5em;
}
#edu-links h6 {
  display: none;
  line-height: 1.2em;
}
#edu-links a {
  font-size: 1em;
  line-height: 1.2em;
  color: var(--font-color-main);
  text-decoration: none;
  font-family: akzidenz-grotesk-next-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  border: 2px solid var(--nero);
  border-radius: 50px;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  padding-right: 1em;
  padding-left: 1em;
  backdrop-filter: blur(10px);
  text-wrap: nowrap;
}
.reverse {
  display: flex;
  flex-direction: column-reverse;
}
/* TABLET 1 [GLOBAL] */
@media (min-width: 768px) {
  .member-name {
    font-size: 4em;
  }
  .member-title {
    font-size: 1.5em;
  }
  .member-img-container {
    height: 50em;
  }
  .member-bio {
    font-size: 1.5em;
    line-height: 1.5em;
    padding-top: 3em;
  }
  #edu-links {
    padding-left: 3em;
  }
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  .member-name {
    padding-top: 1em;
    font-size: 2.5em;
  }
  .member-img-container {
    border-radius: 100%;
    width: 20em;
    height: 20em;
    border: 4px solid var(--nero);
  }
  .reverse {
    display: unset;
  }
  .member-bio {
    padding-top: 0em;
    font-size: 1em;
  }
  #edu-links {
    padding-left: 4em;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #team-member {
    padding-right: 12em;
  }
  .member-img-container {
    border-radius: 100%;
    width: 26em;
    height: 26em;
    border: 4px solid var(--nero);
  }
  #top-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  .member-name {
    font-size: 2.5em;
    padding: 0;
    padding-top: 0.5em;
  }
  .member-title {
    font-size: 2em;
    margin-bottom: 1.5em;
  }
  .member-bio {
    padding: 0;
    font-size: 1.25em;
    line-height: 1.5em;
  }
  #edu-links {
    position: relative;
    bottom: 0;
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0;
    gap: 0.5em;
  }
  #edu-links h6 {
    font-size: 1em;
  }
  #edu-links a {
    font-size: 1em;
  }
}
/* DESKTOP 3 [GLOBAL] */
@media (min-width: 1728px) {
  .member-name {
    font-size: 4rem;
  }
  .member-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .member-bio {
    font-size: 1.5rem;
  }
}
/* DESKTOP 4 (Standard pc Monitor) */
@media (min-width: 1920px) {
  .member-name {
    font-size: 4em;
  }
  .member-bio {
    font-size: 1.5em;
  }
}
</style>
