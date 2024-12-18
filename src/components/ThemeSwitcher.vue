<template>
    <div :class="{ 'dark-mode': !isDark }" class="theme-wrapper">
      <div class="button-switcher" @click="toggleTheme">
        <span class="text second" v-if="isDark">בהיר</span>
        <span class="text first" v-else>כהה</span>
        <div class="moving-circle" :style="circlePositionStyle"></div>
      </div>
    </div>
  </template>
  <script>
  export default {
    props: ['darkMode'],
    data() {
      return {
        isDark: this.darkMode, // Sync initial state with the prop
      };
    },
    watch: {
      darkMode(newValue) {
        this.isDark = newValue; // Update internal state when the prop changes
      },
    },
    computed: {
      circlePositionStyle() {
        return {
          transform: this.isDark
            ? 'translateX(0.25rem)' // Circle moves to the right for dark mode
            : 'translateX(-1.77rem)', // Circle stays left for light mode
          transition: 'transform 0.5s ease',
        };
      },
    },
    methods: {
      toggleTheme() {
        this.isDark = !this.isDark; // Toggle the theme
        this.$emit('toggle-theme', this.isDark); // Notify parent of the change
      },
    },
  };
  </script>
  <style>
     /* Global Variables for Light Mode */
  :root {
    --bg-color: #4d4d4d;/* Dark mode background */
    --text-color: rgb(245, 245, 245); /* Dark mode text */
    --circle-color: #fbb03b; /* Dark mode circle */
  }
  
  /* Dark Mode Variables */
  .dark-mode {
    --bg-color:   #dae6e6; /* Light mode background */
    --text-color: #005051b3;/* Light mode text */
    --circle-color:  #b33e4ed1;/* Light mode circle */

  }
</style>
  <style scoped>
  /* Wrapper for theme styles */
  .theme-wrapper {
    transition: background-color 0.5s ease, color 0.5s ease;
  }
  
  /* Button Switcher Styles */
  .button-switcher {
    width: 3rem;
    height: 1.5rem;
    border-radius: 15rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.25rem;
    cursor: pointer;
    background-color: var(--bg-color); /* Dynamic background */
    transition: background-color 0.5s ease;
    z-index: 10000000;
  }
  
  .text {
    font-size: 0.8rem;
    z-index: 1000;
    color: var(--text-color); /* Dynamic text color */
    transition: color 0.5s ease;
  }
  
  .text.second {
    margin-right: 1.4rem;
  }

  .text.first {
    margin-right: 0.17rem;
  }
  
  .moving-circle {
    height: 1.45rem;
    width: 1.45rem;
    border-radius: 50%;
    position: absolute;
    background-color: var(--circle-color); /* Dynamic circle color */
    transition: background-color 0.5s ease, transform 0.5s ease;
  }
  
 
  </style>
  