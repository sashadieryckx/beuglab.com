<script setup>
import IconProffessor from '@/components/icons/IconProffessor.vue'
import IconScience from '@/components/icons/IconScience.vue'
import IconResearch from '@/components/icons/IconResearch.vue'
import { onMounted, ref } from 'vue'
import { sanity } from '@/assets/js/sanity.js'

// Reactive sanity variables
const bio = ref('')
const positionOneH3 = ref('')
const positionOneText = ref('')
const positionTwoH3 = ref('')
const positionTwoText = ref('')
const positionThreeH3 = ref('')
const positionThreeText = ref('')
const researchHeading = ref('')
const researchText = ref('')
const areaOne = ref('')
const areaTwo = ref('')
const areaThree = ref('')
const goal = ref('')
const sectionHeadingOne = ref('')
const sectionTextOne = ref('')
const sectionHeadingTwo = ref('')
const sectionTextTwo = ref('')
const error = ref(false)

onMounted(async () => {
  try {
    const query = `*[_type == "drBeugPage"][0]{
      bio,
      positionOneH3,
      positionOneText,
      positionTwoH3,
      positionTwoText,
      positionThreeH3,
      positionThreeText,
      researchHeading,
      researchText,
      areaOne,
      areaTwo,
      areaThree,
      goal,
      sectionHeadingOne,
      sectionTextOne,
      sectionHeadingTwo,
      sectionTextTwo,
    }`
    const data = await sanity.fetch(query)
    bio.value = data.bio
    positionOneH3.value = data.positionOneH3
    positionOneText.value = data.positionOneText
    positionTwoH3.value = data.positionTwoH3
    positionTwoText.value = data.positionTwoText
    positionThreeH3.value = data.positionThreeH3
    positionThreeText.value = data.positionThreeText
    researchHeading.value = data.researchHeading
    researchText.value = data.researchText
    areaOne.value = data.areaOne
    areaTwo.value = data.areaTwo
    areaThree.value = data.areaThree
    goal.value = data.goal
    sectionHeadingOne.value = data.sectionHeadingOne
    sectionTextOne.value = data.sectionTextOne
    sectionHeadingTwo.value = data.sectionHeadingTwo
    sectionTextTwo.value = data.sectionTextTwo
  } catch (error) {
    error.value = true
  }
})

// SEO Configuration
import { useSEO, createPersonSchema } from '@/composables/useSEO'
useSEO({
  title: 'Dr. Shawn Beug',
  description: 'Meet Dr. Shawn Beug, internationally recognized cancer biologist specializing in molecular mechanisms of tumor progression, metastasis, and treatment resistance. Assistant Professor at University of Ottawa and Scientist at CHEO Research Institute.',
  path: '/about/dr-beug',
  image: '/logo.png',
  schema: createPersonSchema({
    name: 'Dr. Shawn Beug',
    jobTitle: 'Assistant Professor, Scientist, Canada Research Chair (Tier 2) in Cancer Biology and Translational Research',
    description: 'Dr. Shawn Beug is an internationally recognized cancer biologist specializing in the molecular mechanisms of tumor progression, metastasis, and treatment resistance.',
    image: 'https://beuglab.ca/logo.png',
    url: 'https://beuglab.ca/about/dr-beug'
  })
})
</script>
<template>
  <div id="main-content" class="main-content clickable">
    <div id="introduction" class="section">
      <div id="intro-txt" class="df-pad">
        <h1 id="name">Dr. Shawn Beug</h1>
        <h6>{{ bio }}</h6>
        <h6 v-if="error">
          Dr. Shawn Beug is an internationally recognized cancer biologist specializing in the
          molecular mechanisms of tumor progression, metastasis, and treatment resistance. With a
          strong foundation in cell signaling, immune modulation, and cancer epigenetics, Dr. Beug
          leads cutting-edge research aimed at uncovering new therapeutic strategies for
          difficult-to-treat cancers. He holds multiple academic and leadership roles across
          top-tier Canadian institutions.
        </h6>
        <div class="button contact-open clickable">
          <p>Get in touch</p>
        </div>
        <div id="connect" class="clickable">
          <a href="https://ca.linkedin.com/in/shawn-beug-9711292b">LinkedIn ↗</a>
          <a href="https://www.cheoresearch.ca/research/find-a-researcher/shawn-beug-phd/"
            >CHEO RI ↗</a
          >
          <a href="https://www.uottawa.ca/faculty-medicine/dr-shawn-beug"
            >University of Ottawa ↗</a
          >
        </div>
      </div>
      <div id="pfp-container">
        <div id="pfp-circle">
          <div id="pfp-overlay"></div>
          <img
            src="../../assets/content/images/team/ShawnBeug.jpeg"
            alt="Dr. Shawn Beug"
            id="pfp"
          />
        </div>
      </div>
    </div>
    <div id="positions" class="section">
      <div id="pos-1" class="position">
        <IconProffessor class="pos-icon" />
        <h3>{{ positionOneH3 }}</h3>
        <h3 v-if="error">Assistant Prof</h3>
        <p>{{ positionOneText }}</p>
        <p v-if="error">
          Department of Biochemistry, Microbiology and Immunology, Faculty of Medicine, University
          of Ottawa
        </p>
      </div>
      <div id="pos-2" class="position">
        <IconScience class="pos-icon" />
        <h3>{{ positionTwoH3 }}</h3>
        <h3 v-if="error">Scientist</h3>
        <p>{{ positionTwoText }}</p>
        <p v-if="error">CHEO Research Institute, Cancer Therapeutics Program</p>
      </div>
      <div id="pos-3" class="position">
        <IconResearch class="pos-icon" id="iconfix" />
        <h3>{{ positionThreeH3 }}</h3>
        <h3 v-if="error">Canada Research Chair</h3>
        <p>{{ positionThreeText }}</p>
        <p v-if="error">(Tier 2) in Cancer Biology and Translational Research</p>
      </div>
    </div>
    <div id="research" class="section df-pad">
      <div id="research-txt">
        <h1>{{ researchHeading }}</h1>
        <h1 v-if="error">Research Focus</h1>
        <h6>{{ researchText }}</h6>
        <h6 v-if="error">
          Dr. Beug’s research centers on understanding how cancer cells evade therapeutic
          intervention and immune detection. His lab explores the dynamic interplay between the
          tumor microenvironment and cellular signaling pathways to uncover novel vulnerabilities in
          aggressive cancers.
        </h6>
        <h6>Key Areas of Investigation:</h6>
      </div>
      <div id="areas">
        <div class="area">
          <h6>{{ areaOne }}</h6>
          <h6 v-if="error">Mechanisms of therapeutic resistance</h6>
        </div>
        <div class="area">
          <h6>{{ areaTwo }}</h6>
          <h6 v-if="error">Tumor immune evasion</h6>
        </div>
        <div class="area">
          <h6>{{ areaThree }}</h6>
          <h6 v-if="error">Identification of new drug targets</h6>
        </div>
      </div>
    </div>
    <div id="goal">
      <h3>{{ goal }}</h3>
      <h3 v-if="error">
        His labs ultimate goal is to translate foundational research discoveries into clinically
        relevant therapies that can improve outcomes for patients with advanced cancers.
      </h3>
    </div>
    <div id="education" class="section">
      <div class="section-txt df-pad">
        <h1>{{ sectionHeadingOne }}</h1>
        <h1 v-if="error">Education & Training</h1>
        <h6>{{ sectionTextOne }}</h6>
        <h6 v-if="error">
          Dr. Beug received his PhD in Pathology from Dalhousie University, where he studied cell
          signaling pathways in cancer development. He completed postdoctoral training at the
          Princess Margaret Cancer Centre (University Health Network) in Toronto, one of Canada’s
          leading cancer research institutions, under the mentorship of world-renowned experts in
          cancer biology and immunology.
        </h6>
      </div>
      <div class="section-img">
        <img src="../../assets/content/images/BeugLab-Still-03.jpg" alt="tbd" />
      </div>
    </div>
    <div id="collab" class="section">
      <div class="section-img">
        <img src="../../assets/content/images/BeugLab-Still-04.jpg" alt="tbd" />
      </div>
      <div class="section-txt df-pad">
        <h1>{{ sectionHeadingTwo }}</h1>
        <h1 v-if="error">Collaborations & Mentorship</h1>
        <h6>{{ sectionTextTwo }}</h6>
        <h6 v-if="error">
          Dr. Beug is deeply committed to fostering the next generation of biomedical researchers.
          His lab actively mentors undergraduate, graduate, and postdoctoral trainees. He also
          collaborates with clinicians, immunologists, and computational biologists to bridge the
          gap between lab discoveries and patient care
        </h6>
      </div>
    </div>
    <div id="recognition" class="section df-pad">
      <div class="divider"></div>
      <h1>Recognition</h1>
      <div class="rec">
        <h6>Canada Research Chair (Tier 2) – Recognizing emerging leaders in health research.</h6>
      </div>
      <div class="rec">
        <h6>
          Multiple peer-reviewed grants and fellowships from national agencies, including CIHR and
          NSERC.
        </h6>
      </div>
      <div class="rec">
        <h6>
          Published in leading journals and frequently invited to speak at scientific conferences.
        </h6>
      </div>
    </div>
  </div>
</template>
<style scoped>
.section {
  position: relative;
  width: 100%;
  height: 100%;
}
#introduction {
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(233, 233, 233, 1));
  display: flex;
  flex-basis: 0;
  flex-direction: column-reverse;
  padding-bottom: 4em;
}
#intro-txt {
  position: relative;
  z-index: 2;
}
#name {
  font-size: 2.75em;
  line-height: 1em;
  padding-bottom: 1em;
  text-transform: uppercase;
}
#introduction h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-bottom: 2em;
  text-align: justify;
}
#connect {
  padding-top: 2em;
}
#connect a {
  cursor: pointer;
  pointer-events: auto;
}
#pfp-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
#pfp-circle {
  z-index: 1;
}
#pfp,
#pfp-overlay {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#pfp-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0),
    rgba(233, 233, 233, 0.1),
    rgba(233, 233, 233, 1)
  );
}
#connect {
  display: none;
}
#positions {
  z-index: 2;
  border-radius: 25px;
}
.position {
  background-color: #2c2c2c;
  border-radius: 50px;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.position h3,
.position p {
  color: var(--blanco);
  text-align: center;
}
.position h3 {
  font-size: 1.5em;
  padding-bottom: 0.5em;
}
.pos-icon {
  width: 3.5em;
  height: 3.5em;
  margin-bottom: 1em;
}
#research {
  padding-top: 5em;
  padding-bottom: 6em;
}
#research-txt :nth-child(1) {
  font-size: 2.5em;
  line-height: 1.1em;
  text-transform: uppercase;
}
#research-txt h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-top: 2em;
  padding-bottom: 1em;
}
#research-txt :nth-child(3) {
  font-size: 1.5em;
  padding-top: 1em;
  padding-bottom: 0;
}
.area {
  padding-top: 1em;
}
.area h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  font-style: italic;
}
#goal {
  width: 100%;
  padding-top: 4em;
  padding-bottom: 4em;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  justify-content: center;
  background-color: #22222220;
}
#goal h3 {
  font-size: 1.5em;
  text-align: center;
  line-height: 1.5em;
}
.section-txt {
  padding-top: 4em;
  padding-bottom: 4em;
}
.section-txt :nth-child(1) {
  font-size: 1.75em;
  line-height: 1.25em;
  width: 100%;
  padding-bottom: 0.5em;
  text-transform: uppercase;
}
.section-txt h6 {
  font-size: 1.25em;
  line-height: 1.5em;
  padding-top: 1em;
  padding-bottom: 1em;
}
.section-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#collab {
  display: flex;
  flex-direction: column-reverse;
}
#recognition {
  padding-top: 5em;
  padding-bottom: 6em;
}
#recognition :nth-child(2) {
  font-size: 2em;
  line-height: 1.25em;
  text-transform: uppercase;
}
.rec {
  padding-top: 2em;
}
.rec h6 {
  font-size: 1.25em;
  line-height: 1.5em;
}
.divider {
  display: none;
  height: 2px;
  width: 100%;
  background-color: var(--nero);
  margin-bottom: 8em;
}
/* TABLET 2 [GLOBAL] */
@media (min-width: 1000px) {
  #introduction {
    flex-direction: row;
    padding: 0;
    padding-top: 4em;
    max-height: 100vh;
    overflow: hidden;
  }
  #intro-txt {
    width: 100%;
    padding-top: 2em;
  }
  #name {
    font-size: 4em !important;
    line-height: 1.1em !important;
    padding-bottom: 0.5em !important;
  }
  #intro-txt h6 {
    font-size: 1em;
    padding-bottom: 2em;
  }
  #pfp-circle {
    position: absolute;
    display: none;
  }
  #connect {
    display: block;
    padding-top: 3em;
  }
  #connect a {
    font-family: akzidenz-grotesk-next-pro, sans-serif;
    font-weight: 200;
    letter-spacing: normal;
    font-size: 1em;
    color: var(--font-color-main);
    transition: all 0.5s ease;
    margin-right: 1.5em;
    text-decoration: none;
  }
  #positions {
    display: flex;
    flex-direction: row;
    padding-left: 1em;
    padding-right: 1em;
  }
  #research-txt :nth-child(1) {
    font-size: 5em;
    padding-bottom: 0.5em;
  }
  #goal h3 {
    font-size: 2em;
  }
  #collab,
  #education {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  #recognition {
    background-color: #22222220;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
/* DESKTOP 1 [GLOBAL] */
@media (min-width: 1280px) {
  #main-content {
    min-height: 100vh;
  }
  #introduction {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    min-height: 100vh;
  }
  #intro-txt {
    grid-column: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 4em;
  }
  #name {
    font-size: 4em !important;
  }
  #introduction h6 {
    font-size: 1.25em;
    line-height: 1.5em;
    padding-bottom: 2em;
    width: 80%;
  }
  .button p {
    font-size: 1.25em;
  }
  #connect {
    padding-top: 4em;
  }
  #connect a {
    font-size: 1.5em;
  }
  #pfp-container {
    position: relative;
    grid-column: 2;
    width: 100%;
  }
  #pfp-circle {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #pfp-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(233, 233, 233, 1) 0%,
      rgba(233, 233, 233, 0.1) 15%,
      rgba(233, 233, 233, 0.1) 50%,
      rgba(233, 233, 233, 1) 90%
    );
    z-index: 1;
  }
  #pfp,
  #pfp-overlay {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  #connect a:hover {
    color: var(--font-color-hover);
  }
  #positions {
    margin: 0;
    border-radius: 50px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4em;
  }
  .position {
    background-color: #2c2c2c80;
    backdrop-filter: blur(10px);
    justify-content: flex-start;
    padding: 3em;
    border: 2px solid var(--blanco);
  }
  .position h3 {
    font-size: 1.75em;
  }
  .position p {
    font-size: 1.25em;
  }
  .pos-icon {
    width: 7em;
    height: 7em;
    margin-bottom: 2em;
  }
  #research-txt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 8em;
    padding-bottom: 8em;
  }
  #research-txt :nth-child(1) {
    padding: 0 !important;
    width: 50% !important;
    font-size: 5em;
  }
  #research-txt h6 {
    width: 50%;
    font-size: 1.25em;
    line-height: 1.5em;
    padding-top: 2em;
    padding-bottom: 2em;
    padding-right: 8em;
  }
  #research-txt :nth-child(3) {
    font-size: 2.5em;
    width: 100% !important;
  }
  #areas {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 2em;
    padding-bottom: 4em;
  }
  .area {
    background-color: #4e4e4ec2;
    backdrop-filter: blur(10px);
    width: 25em;
    height: 18em;
    padding: 2em;
    color: var(--blanco);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  }
  .area h6 {
    font-size: 2em;
    line-height: 1.25em;
    font-style: normal;
  }
  #goal {
    width: 100%;
    padding: 8em;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(10px);
    background-color: #22222220;
  }
  #goal h3 {
    font-size: 3em;
    text-align: center;
    line-height: 1.5em;
  }
  .section-txt {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-top: 4em;
    padding-bottom: 4em;
  }
  .section-txt :nth-child(1) {
    font-size: 3em;
    line-height: 1.25em !important;
    width: 100%;
    padding: 0 !important;
  }
  .section-txt h6 {
    font-size: 1.25em;
    line-height: 1.5em;
    padding-top: 2em;
  }
  .section-img img {
    border-radius: 25px;
  }
  #education img {
    margin-right: 8em;
  }
  #collab img {
    margin-left: 8em;
  }
  #collab,
  #education {
    margin: 0;
    padding-top: 12em;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  #education p {
    padding-right: 8em;
  }
  #education .section-txt {
    padding-right: 8em;
  }
  #collab .section-txt {
    padding-left: 8em;
  }
  #recognition {
    background-color: transparent;
    padding-top: 14em;
    padding-bottom: 14em;
  }
  #recognition :nth-child(2) {
    font-size: 3em;
    padding-bottom: 0.5em;
  }
  .rec {
    width: 50%;
    padding-top: 2em;
  }
  .rec h6 {
    font-size: 2em;
    text-align: center;
  }
  .divider {
    display: block;
  }
}
/* DESKTOP 4 (Macbook Pro 15-Inch -------------------------------------------------------------------------------------------*/
@media (min-width: 1440px) {
  #name {
    font-size: 5.5em;
  }
}
/* DESKTOP 4 (Standard pc Monitor) -------------------------------------------------------------------------------------------*/
@media (min-width: 1920px) {
  #name {
    font-size: 5.5em !important;
    text-align: left !important;
  }
  #intro-txt h1 {
    padding-bottom: 0.5em;
  }
  #intro-txt h6 {
    font-size: 1.25em;
    padding-bottom: 2em;
  }
  #research-txt h6,
  .section-txt h6 {
    font-size: 1.5em;
  }
  .section-txt :nth-child(1),
  #recognition :nth-child(2) {
    font-size: 4em;
  }
}
/* DESKTOP 5 (4k + Larger) */
@media (min-width: 2160px) {
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .section {
    max-width: 2400px;
    width: 100%;
  }
  #introduction {
    padding-top: 6em;
    padding-left: 6em;
    padding-right: 6em;
  }
  #name {
    font-size: 7em !important;
    line-height: 1em !important;
    padding-bottom: 0.75em !important;
  }
  #intro-txt h6 {
    font-size: 1.75em;
    line-height: 1.6em;
    padding-bottom: 2.5em;
    width: 85%;
  }
  .button {
    padding: 1.25em 2.5em;
  }
  .button p {
    font-size: 1.5em;
  }
  #connect {
    padding-top: 5em;
  }
  #connect a {
    font-size: 1.75em;
    margin-right: 2em;
  }
  #pfp-circle {
    padding: 3em;
  }
  #positions {
    gap: 6em;
    padding: 6em;
  }
  .position {
    padding: 4em;
    border-radius: 60px;
  }
  .position h3 {
    font-size: 2.25em;
    padding-bottom: 1em;
  }
  .position p {
    font-size: 1.5em;
    line-height: 1.4em;
  }
  .pos-icon {
    width: 8em;
    height: 8em;
    margin-bottom: 2.5em;
  }
  #research {
    padding-top: 10em;
    padding-bottom: 10em;
    padding-left: 6em;
    padding-right: 6em;
  }
  #research-txt :nth-child(1) {
    font-size: 6.5em;
    padding-bottom: 0.75em;
  }
  #research-txt h6 {
    font-size: 1.75em;
    line-height: 1.6em;
    padding-top: 2.5em;
    padding-bottom: 2.5em;
    padding-right: 10em;
    width: 60%;
  }
  #research-txt :nth-child(3) {
    font-size: 3em;
    padding-top: 2em;
    padding-bottom: 1.5em;
  }
  #areas {
    gap: 3em;
    padding-bottom: 6em;
  }
  .area {
    width: 30em;
    height: 22em;
    padding: 3em;
    border-radius: 30px;
  }
  .area h6 {
    font-size: 2.5em;
    line-height: 1.3em;
  }
  #goal {
    padding: 10em;
  }
  #goal h3 {
    font-size: 3.75em;
    line-height: 1.4em;
    width: 80%;
  }
  .section-txt {
    padding-top: 6em;
    padding-bottom: 6em;
  }
  .section-txt :nth-child(1) {
    font-size: 4.5em;
    padding-bottom: 1em;
  }
  .section-txt h6 {
    font-size: 1.75em;
    line-height: 1.6em;
    padding-top: 2.5em;
  }
  #education,
  #collab {
    padding-top: 16em;
    padding-left: 6em;
    padding-right: 6em;
  }
  #education .section-txt {
    padding-right: 12em;
  }
  #collab .section-txt {
    padding-left: 12em;
  }
  #education img {
    margin-right: 12em;
    border-radius: 35px;
  }
  #collab img {
    margin-left: 12em;
    border-radius: 35px;
  }
  #recognition {
    padding-top: 18em;
    padding-bottom: 18em;
    padding-left: 6em;
    padding-right: 6em;
  }
  #recognition :nth-child(2) {
    font-size: 4.5em;
    padding-bottom: 1.5em;
  }
  .rec {
    width: 70%;
    padding-top: 3em;
  }
  .rec h6 {
    font-size: 2.25em;
    line-height: 1.5em;
  }
  .divider {
    margin-bottom: 12em;
    height: 3px;
  }
}
</style>
