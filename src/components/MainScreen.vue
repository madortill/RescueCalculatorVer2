<template>
  <div div id="main-screen" :style="{ backgroundColor: darkMode ? 'black' : 'white' }">



    <!-- <div v-else> -->
        <Calculator2SVG 
          class="container"
          :key="containerKey" 
          :darkMode="darkMode" 
          :MKinfo = "MKinfo"
          :degreeInfo = "degreeInfo"
          :clickedStates="clickedStates"
          @chosen-btn="handleChosenBtn" 
          @clickedBtn="handleClicked">
      </Calculator2SVG>
    

      <CalculatingContainer 
        class="container"
        :key="containerKey"
        :darkMode="darkMode"
        :chosenValueString="chosenValueString"
        :stringBtn="stringBtn"
        :clickedStates="clickedStates" 
        @clickedBtn="handleClicked"
        @reset="reset"
        @MKinfo="foundMK"
        @DegreeInfo="foundDegree"
        @calculatedResult="sendResult"
        @nextScreen="sendToNext"
        >
       </CalculatingContainer>
    </div>

   
  <!-- </div> -->
</template>

<script>
import Calculator2SVG from './Calculator2SVG.vue';
import CalculatorLightSVG from './CalculatorLightSVG.vue';
import ThemeSwitcher from './ThemeSwitcher.vue'
import CalculatingContainer from './CalculatingContainer.vue';


export default {
  name: "main-screen",
  props: ['darkMode'], 
  components: {
    Calculator2SVG,
    CalculatorLightSVG,
    ThemeSwitcher,
    CalculatingContainer
  },
  data() {
    return {
      // darkMode: true,
      chosenValueString: null,
      stringBtn: '',
      clickedStates: {
        formula: false,
        ground: false,
        degree: false,
      },
      MKinfo: null,
      degreeInfo: null,
      counter: 0,
      showLoader: true,
      containerKey: 0,
      gifLoaded: false, // Track when the GIF is fully loaded
   };
  },
  computed: {
  },
  methods: {
    foundMK(ground) {
      this.MKinfo = ground;
    },
    foundDegree(degree) {
      this.degreeInfo = degree;
    },
    handleClicked(btn) {
      const currentState = this.clickedStates[btn];
      Object.keys(this.clickedStates).forEach(name => {
        this.clickedStates[name] = false;
      });
      this.clickedStates[btn] = !currentState;
    },
    sendToNext(page) {
      this.$emit("nextScreen", page);     
    },
    handleChosenBtn(chosenBtn) { 
      this.counter++;
      // console.log(chosenBtn);
      if (Number(chosenBtn) || Number(chosenBtn) === 0) {
          this.chosenValueString = String(chosenBtn)+String(this.counter);
      } else {
        this.stringBtn = String(chosenBtn)+String(this.counter);
        // console.log(this.stringBtn);
       }
    },
    reset() {
      this.resetCalc = true;
      this.chosenValueString = null;
      this.stringBtn = '';
      this.clickedStates = {
        formula: false,
        ground: false,
        degree: false,
      };
      this.MKinfo = null;
      this.degreeInfo = null;
      this.containerKey++;

      setTimeout( () => {
        this.resetCalc = false;
      }, 100);
    },
    sendResult(result) {
      this.$emit("calculatedResult", result);
    },
  },
}
</script>

<style scoped>
#main-screen {
    width: 100%;
    height: 100%;
    background-size: 110% 110%;
}

.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
}


</style>