<template>
    <div id="about-page" :class="darkMode ? 'dark-mode' : 'light-mode'">
        <div v-if="!clicked" @click="openAbout">i</div>
        <div v-else>
            <div class="aboutHeadline">אודות</div>
            <br>
            <div> פותח עבור בה"ד 20 </div>
            <div class="sub-titles"> רמ"ד טי"ל:</div>
            <div> רס"מ שלומי אוגרן</div>
            <div class="sub-titles">מפתחת ראשית:</div>
            <div> רב"ט גילי גורדון</div>
            <div class="sub-titles">מומחה תוכן:</div>
            <div>יוחאי עזרא</div>
            <div class="sub-titles">גרסה:</div>
            <div>דצמבר 2024</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "about-page",
  props: ["darkMode"],
  data() {
    return {
        clicked: false,
    };
  },
  methods: {
   
  },
};
</script>

<style scoped>
/* General Styles */


</style>
