<template>
    <div id="app">

    <!-- Global Loader -->
    <div v-if="showGlobalLoader" class="loader" :class="darkMode ? 'dark-mode' : 'light-mode'">
      <img 
        class="gif" 
        src="/src/assets/media/blackonwhite-ezgif.com-gif-maker.gif" 
        alt="Loading..." 
        @load="gifLoaded = true" 
      />
      <p class="loader-text">מיד מתחילים...</p>
    </div>

    <!-- Calc Loader -->
    <div v-if="showCalcLoader" class="loader" :class="darkMode ? 'dark-mode orange' : 'light-mode'">
      <img 
        class="gif" 
        src="/src/assets/media/calc-gif.gif" 
        alt="Calculating..." 
        @load="calcGifLoaded = true" 
      />
      <!-- <p class="loader-text">בקרוב מחשבים...</p> -->
    </div>

    <div v-if="!gifLoaded && (showGlobalLoader || showCalcLoader)" class="fallback-spinner">
      <p>טוען...</p>
      <div class="spinner"></div>
    </div>
    

      <opening-screen 
          v-show="page === 0" 
          @nextScreen="goToNext"
           @toggle-theme="changeMode"
          :darkMode="darkMode">
      </opening-screen>

      <main-screen 
           v-show="page === 1"  
          @nextScreen="goToNext"
          @calculatedResult="saveResult"
          @toggle-theme="changeMode"
          :darkMode="darkMode">
      </main-screen>

      <ending-screen
         v-show="page === 2" 
         @goBack="goBack" 
         :darkMode="darkMode"
         :result="result">
      </ending-screen>

      <ThemeSwitcher
        @click="changeMode">
    </ThemeSwitcher>
    </div>
</template>

<script>
import MainScreen from './components/MainScreen.vue'
import OpeningScreen from './components/OpeningScreen.vue'
import EndingScreen from './components/EndScreen.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

export default {
  name: "app",
  components: {
  MainScreen,
  OpeningScreen,
  ThemeSwitcher,
  EndingScreen
  },
  data() {
    return {
      page: 0,
      // page: 2,
      darkMode: false,
      result: null,
      showGlobalLoader: false,
      showCalcLoader: false,
      gifLoaded: false,
      calcGifLoaded: false,

    }
  },
  methods: {
    async preloadGif(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false); // Handle failures gracefully
  });
},
goToNext(pageSent) {
      this.page = pageSent ?? this.page + 1;
      if (this.page === 1) {
        this.initializeLoader("global");
      } else if (this.page === 2) {
        this.initializeLoader("calc");
      }
    },
async initializeLoader(type) {
  const MINIMUM_LOADER_TIME = 6750;
  const loaderStartTime = Date.now();
  const gifSrc = type === "calc"
    ? "/src/assets/media/calc-gif.gif"
    : "/src/assets/media/blackonwhite-ezgif.com-gif-maker.gif";

  if (type === "calc") this.showCalcLoader = true;
  else this.showGlobalLoader = true;

  const gifPreloaded = await this.preloadGif(gifSrc);

  if (!gifPreloaded) {
    console.error(`Failed to preload GIF: ${gifSrc}`);
    // Show fallback content or hide the loader
    setTimeout(() => {
      this.showCalcLoader = false;
      this.showGlobalLoader = false;
    }, MINIMUM_LOADER_TIME);
    return; // Exit early since the GIF failed
  }

  const timeElapsed = Date.now() - loaderStartTime;
  const timeRemaining = MINIMUM_LOADER_TIME - timeElapsed;

  setTimeout(() => {
    if (type === "calc") this.showCalcLoader = false;
    else this.showGlobalLoader = false;
  }, timeRemaining > 0 ? timeRemaining : 0);
},
    goBack() {
      this.page--;
    },
    saveResult(unsavedResult) {
      this.result = unsavedResult;
    },
    changeMode() {
      this.darkMode = !this.darkMode;
    },
    updateMetaTags() {
      // Update theme color for Android browsers
      const themeMetaTag = document.querySelector('meta[name="theme-color"]');
      if (themeMetaTag) {
        themeMetaTag.setAttribute("content", this.darkMode ? "#000000" : "#ffffff");
      } else {
        const newThemeMetaTag = document.createElement("meta");
        newThemeMetaTag.name = "theme-color";
        newThemeMetaTag.content = this.darkMode ? "#000000" : "#ffffff";
        document.head.appendChild(newThemeMetaTag);
      }

      // Update status bar style for iOS Safari
      const statusBarMetaTag = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (statusBarMetaTag) {
        statusBarMetaTag.setAttribute("content", this.darkMode ? "black-translucent" : "default");
      } else {
        const newStatusBarMetaTag = document.createElement("meta");
        newStatusBarMetaTag.name = "apple-mobile-web-app-status-bar-style";
        newStatusBarMetaTag.content = this.darkMode ? "black-translucent" : "default";
        document.head.appendChild(newStatusBarMetaTag);
      }
    }
  },
  watch: {
    darkMode: {
      handler: "updateMetaTags",
    },
  },
  mounted() {
    // Ensure the initial theme color is set when the app is loaded
    this.updateMetaTags();
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Heebo';
  src: url(/src/assets/fonts/Heebo/Heebo-Regular.ttf);
}

@font-face {
  font-family: 'OpenSansHebrew';
  src: url(/src/assets/fonts/OpenSansHebrew/OpenSansHebrew-Italic.ttf);
}
/* html {
  font-size: calc(14px + 0.4vw);
}

#app {
  direction: rtl;
  width: 100vw;
	height: 100vh;
  overflow: hidden;
  font-family: 'Heebo';
} */

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: black; /* Matches dark mode */
  color: white; /* Adjust text color for dark mode */
}

#app {
  direction: rtl;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Heebo';
  padding-top: env(safe-area-inset-top); /* Ensures the app accounts for the notch */
  background-color: var(--app-bg-color); /* Dynamic background */
}

/* Add a dynamic background color for light/dark mode */
:root {
  --app-bg-color: white;
}
.dark-mode {
  --app-bg-color: black;
}




/* טוען */
.loader {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    background-color: white ;
    font-weight: 800;
}

.dark-mode {
  background-color: black !important;
}

.gif {
  width: 100%;
  z-index: 1000000;
}

.loader-text {
  font-size: 2rem;
}

.dark-mode .loader-text {
  color: white;
}

.light-mode .loader-text {
  color: #005051b3;
}

.dark-mode .gif {
  filter: brightness(1.9) contrast(1.2) sepia(1) saturate(400%) hue-rotate(-10deg); /* Makes it orange */
}
.orange {
  filter: brightness(0.8) contrast(1.2) sepia(1) saturate(600%) hue-rotate(-40deg);
}
.light-mode .gif {
  filter: brightness(1.2) contrast(1.2) sepia(1) saturate(300%) hue-rotate(-60deg); /* Makes it pink */
}

.fallback-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
