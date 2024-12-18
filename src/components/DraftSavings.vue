<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.62 754" :class="isDark ? 'dark-mode' : 'light-mode'">
      <g id="Layer_1" data-name="Layer 1">
        <rect class="background" width="450" height="600" />
      </g>
      <g id="Layer_3" data-name="Layer 3">
        <!-- Row 1 -->
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="60" cy="555" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(75 200) scale(.999)">
              <tspan x="-5" y="370">1</tspan>
          </text>
      </g>
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="150" cy="555" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(157.5 200) scale(.999)">
              <tspan x="2.5" y="370">2</tspan>
          </text>
      </g>
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="245" cy="555" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(240 200) scale(.999)">
              <tspan x="15.5" y="370">3</tspan>
          </text>
      </g>
  
      <!-- Row 2 -->
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="60" cy="460" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(75 300) scale(.999)">
              <tspan x="-5" y="175">4</tspan>
          </text>
      </g>
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="150" cy="460" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(157.5 300) scale(.999)">
              <tspan x="2.5" y="175">5</tspan>
          </text>
      </g>
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="245" cy="460" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(240 300) scale(.999)">
              <tspan x="15.5" y="175">6</tspan>
          </text>
      </g>
  
      <!-- Row 3 -->
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="60" cy="362.5" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(75 400) scale(.999)">
              <tspan x="-5" y="-22.5">7</tspan>
          </text>
      </g>
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="150" cy="362.5" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(157.5 400) scale(.999)">
              <tspan x="2.5" y="-22.5">8</tspan>
          </text>
      </g>
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <ellipse class="cls-1" cx="245" cy="362.5" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(240 400) scale(.999)">
              <tspan x="15.5" y="-22.5">9</tspan>
          </text>
      </g>
  
      <!-- 0 Button -->
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
          <rect class="cls-1" x="25" y="610" width="255" height="75" rx="28.45" ry="28.45" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(160 490) scale(.999)">
              <tspan x="-90" y="175">0</tspan>
          </text>
      </g>
      
      <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
            <rect class="cls-5" x="120" y="240" width="75" height="60"  rx="20" ry="20" />
            <text  class="cls-4 differentSize" :style="{ fontSize: '1.65rem  !important'}"  transform="translate(355 495) scale(.999)">
                <tspan x="-175" y="-217.5">מחק</tspan>
            </text>
        </g>
  
        <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
            <rect class="cls-5" x="30" y="240" width="75" height="60"  rx="20" ry="20" />
            <text  class="cls-4 differentSize" :style="{ fontSize: '1.65rem  !important'}"  transform="translate(355 495) scale(.999)">
                <tspan x="-260" y="-217.5">איפוס</tspan>
            </text>
        </g>
  
        <g class="button" :class="{'disabled': currState.formula || currState.degree || currState.ground, 'disabled' : true}">
            <ellipse class="cls-5 equal" cx="367.5" cy="635" rx="60" ry="60" />
            <text class="cls-3" :style="{ fontSize: '5.5rem'}" transform="translate(365 395) scale(.999)">
                <tspan x="25" y="270" :style="{ fill: 'white'}">=</tspan>
            </text>
        </g>
        
  
        <g id="ground-btn" class="button" :class="{'disabled': currState.degree || currState.formula, 'disabled' : true}">
            <rect class="cls-5" x="635" y="563" width="60" height="125" rx="25" ry="25" transform="translate(-260 1030) rotate(-90)" />
            <g transform="translate(0, 0)">
                <text class="cls-2" text-anchor="middle" x="365" y="375">סוג קרקע</text>
            </g>
        </g>
  
        <g>
          <rect  x="95.5" y="375.5" width="77.5" height="210" rx="22" ry="22" transform="translate(-160 405) rotate(-90)" :class="isDark ? 'dark-button' : 'light-button'" />
            <g :class="{'disabled': !MKfound || currState.formula || currState.degree || currState.ground} ">
            <rect  x="90" y="475.5" width="60" height="90" rx="17.78" ry="17.78" transform="translate(-150 390) rotate(-90)" :class="isDark ? 'dark-button' : 'light-button'" />
            <text class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
                <tspan v-if="MKfound" :x="305" :y="10" :style="{ fontSize: '2rem'}">{{ MKinfo.factor }}</tspan>
            </text>
            <text v-if="MKfound" class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
                <tspan  :x="305" :y="30" :style="{ fontSize: '1rem'}">{{ MKinfo.name }}</tspan>
            </text>
             <text v-else class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
                <tspan :x="305" :y="0" :style="{ fontSize: '1rem'}"> לא נבחר </tspan>
                <tspan :x="305" :y="20" :style="{ fontSize: '1rem'}">סוג קרקע</tspan>
             </text>
             </g>
  
             <g :class="{'disabled': !degreeFound || currState.formula || currState.degree || currState.ground}">
            <rect  x="90" y="375" width="60" height="90" rx="17.78" ry="17.78" transform="translate(-150 390) rotate(-90)" :class="isDark ? 'dark-button' : 'light-button'" />
            <text class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
                <tspan v-if="degreeFound" :x="205" :y="10" :style="{ fontSize: '2rem'}">{{ degreeInfo.factor }}</tspan>
            </text>
            <text v-if="degreeFound" class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
              <tspan :x="205" :y="30" :style="{ fontSize: '1rem'}"> {{ degreeInfo.degree }} מעלות</tspan>     
            </text>
            <text v-else class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
              <tspan :x="205" :y="0" :style="{ fontSize: '1rem'}"> לא נבחר</tspan>
              <tspan :x="205" :y="20" :style="{ fontSize: '1rem'}">  שינוי זוית</tspan>
            </text>
            </g>
        </g>
        
        <g id="degree-btn" class="button" :class="{'disabled': currState.ground || currState.formula, 'disabled' : true}">
            <rect class="cls-5" x="475" y="563.5" width="60" height="125" rx="25" ry="25" transform="translate(-260 1030) rotate(-90)" />
            <g transform="translate(0, 0)">
                <text class="cls-2" text-anchor="middle" x="365" y="535">שינוי זוית</text>
            </g>
        </g>
  
  
        <g id="formula-btn" class="button" :class="{'disabled': currState.ground || currState.degree, 'disabled' : true}">
            <rect class="cls-5" x="130" y="243" width="60" height="125" rx="25" ry="25" transform="translate(60 605) rotate(-90)" />
            <text class="cls-2" transform="translate(280 280) scale(0.999)">
                <tspan x="130" y="175">נוסחאות</tspan>
            </text>
        </g> 
      </g>
    </svg>
  </template>
  
  <script>
    export default {
    name: "calculator-svg",
    props: ['darkMode','MKinfo', 'degreeInfo', 'clickedStates'],
    data() {
        return {
            childrenArr: [],
            chosenBtn: '',
            currClickedStates: {
              formula: undefined,
              ground: undefined,
              degree: undefined
            }
        }
    },
    computed: {
        isDark() {
        return this.darkMode;
        },
        MKfound() {
        return this.MKinfo;
        },
        degreeFound() {
        return this.degreeInfo;
        },
        currState() {
          this.currClickedStates.formula = this.clickedStates.formula;
          this.currClickedStates.ground = this.clickedStates.ground;
          this.currClickedStates.degree = this.clickedStates.degree;
          return this.currClickedStates;
        }
    },
    methods: {
      handleGround() {
      this.$emit('clickedBtn', 'ground');
    },
    handleFormula() {
      this.$emit('clickedBtn', 'formula');
    },
    handleDegree() {
      this.$emit('clickedBtn', 'degree');
      // Add listeners for all other buttons after clicking "degree"
    },
    addListeners() {
      const buttonGroups = document.querySelectorAll(".button");
      buttonGroups.forEach((button) => {
          button.addEventListener("click", this.getInfo);
      });
    },
    getInfo(event) {
        if (this.childrenArr.length === 0) {
            this.childrenArr = event.currentTarget.children;
        }
        for (let i = 0; i < this.childrenArr.length; i++) {
            if ((this.childrenArr[i].children).length > 1) {
                this.childrenArr = this.childrenArr[i].children;
                this.getInfo(this.childrenArr);
            } else if (this.childrenArr[i].tagName === 'text' ) {
                this.chosenBtn = this.childrenArr[i].textContent;
                this.childrenArr = [];
                this.$emit('chosen-btn', this.chosenBtn);
        }
      }
      if (this.chosenBtn === 'נוסחאות') {
        this.handleFormula();
      } else if (this.chosenBtn === 'סוג קרקע') {
        this.handleGround();
      } else if (this.chosenBtn === 'שינוי זוית') {
        this.handleDegree();
      }
    },
    },
    };
  </script>
  
  <style scoped>
  .dark-mode .cls-1 {
    fill: #4d4d4d;
  }
  
  .dark-mode .cls-2 {
    font-family: 'OpenSansHebrew';
    font-size: 1.78rem;
  }
  
  .dark-mode .cls-2,
  .dark-mode .cls-3,
  .dark-mode .cls-4 {
    fill: #fff;
  }
  
  .dark-mode .cls-5 {
    fill: #b3b3b3;
  }
  
  .dark-mode .cls-3 {
    font-size: 3.5rem;
  }
  
  .dark-mode .cls-3,
  .dark-mode .cls-4 {
    font-family: 'Heebo';
  }
  
  .dark-mode .cls-4 {
    font-size: 2.4rem;
  }
  
  .dark-mode .cls-6 {
    fill: #fbb13bc8;
  }
  .dark-mode .background {
  fill: #000; 
  }
  
  .dark-mode .equal {
    fill: #d9911c;
  }
  
  .light-mode .equal {
    fill: #b33e4e !important;
    opacity: 0.75;
  }
  
  .light-mode .cls-1 {
    fill: #2e4a4a61;
  }
  
  .light-mode .cls-2 {
    font-family: 'OpenSansHebrew';
    font-size: 1.78rem;
  }
  
  .light-mode .cls-2,
  .light-mode .cls-3,
  .light-mode .cls-4 {
    fill: #b33e4e;
    opacity: 0.75;
  }
  
  .light-mode .cls-5 {
    fill: #e6e6e6;
  }
  
  .light-mode .cls-3 {
    font-size: 3.5rem;
  }
  
  .light-mode .cls-3,
  .light-mode .cls-4 {
    font-family: 'Heebo';
  }
  
  .light-mode .cls-6 {
    fill: #e6e6e6;
  }
  .light-mode  .light-text {
    fill: #ffffff;
    font-size: 2.4rem;
    opacity: 1;
  }
  
  .light-mode  .differentSize,
  .dark-mode  .differentSize {
    font-size: 1.9rem !important;
    font-family: 'OpenSansHebrew';
  }
  
  .light-mode .background {
      fill: white;
  }
  
  
  .light-button {
    fill: rgba(171, 53, 53, 0.651);
  }
  
  .dark-button {
    fill: #d9911c;
    opacity: 0.75;;
  }
  
  .button.disabled,
  .disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  
  
  </style>
  
  
  
  
  
  