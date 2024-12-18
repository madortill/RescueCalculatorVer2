<!-- הגרסה הכי חדשה - 2.12 שעה 09:55 -->
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 451.62 754" :class="isDark ? 'dark-mode' : 'light-mode'">
    <g id="Layer_1" data-name="Layer 1">
      <rect class="background" width="450" height="600" />
    </g>
    <g id="Layer_3" data-name="Layer 3">
      <!-- Row 1 -->
      <g class="button">
          <ellipse class="cls-1" cx="65" cy="550" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(85 200) scale(.999)">
              <tspan x="-10" y="365">1</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-1" cx="165" cy="550" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(185 200) scale(.999)">
              <tspan x="-10" y="365">2</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-1" cx="265" cy="550" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(285 200) scale(.999)">
              <tspan x="-10" y="365">3</tspan>
          </text>
      </g>

      <!-- Row 2 -->
      <g class="button">
          <ellipse class="cls-1" cx="65" cy="450" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(85 300) scale(.999)">
              <tspan x="-10" y="165">4</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-1" cx="165" cy="450" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(185 300) scale(.999)">
              <tspan x="-10" y="165">5</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-1" cx="265" cy="450" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(285 300) scale(.999)">
              <tspan x="-10" y="165">6</tspan>
          </text>
      </g>

      <!-- Row 3 -->
      <g class="button">
          <ellipse class="cls-1" cx="65" cy="350" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(85 400) scale(.999)">
              <tspan x="-10" y="-35">7</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-1" cx="165" cy="350" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(185 400) scale(.999)">
              <tspan x="-10" y="-35">8</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-1" cx="265" cy="350" rx="37" ry="37" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(285 400) scale(.999)">
              <tspan x="-10" y="-35">9</tspan>
          </text>
      </g>

      <g class="button">
          <rect class="cls-1" x="25" y="610" width="280" height="75" rx="28.45" ry="28.45" />
          <text :class="['cls-4', { 'light-text': !isDark }]" transform="translate(160 490) scale(.999)">
              <tspan x="-90" y="175">0</tspan>
          </text>
      </g>

      <g class="button">
          <ellipse class="cls-5" cx="385" cy="455" rx="46" ry="46" />
          <text  class="cls-4 differentSize" transform="translate(355 495) scale(.999)">
              <tspan x="57.5" y="-30">מחק</tspan>
          </text>
      </g>
      <g class="button">
          <ellipse class="cls-5" cx="385" cy="350" rx="43" ry="43" />
          <text class="cls-3" transform="translate(365 395) scale(.999)">
              <tspan x="35" y="-25">=</tspan>
          </text>
      </g>
      <g id="ground-btn" class="button"  @click="addListeners">
          <rect class="cls-6" x="102.5" y="170" width="70" height="135" rx="17.78" ry="17.78" transform="translate(-150 390) rotate(-90)" />
          <text class="cls-2" transform="translate(55 280) scale(0.999)">
              <tspan x="85" y="-20">סוג קרקע</tspan>
          </text>
      </g>
      <g v-if="MKfound">
          <g class="button">
          <rect  x="102.5" y="337.5" width="70" height="90" rx="17.78" ry="17.78" transform="translate(-150 390) rotate(-90)" :class="isDark ? 'dark-button' : 'light-button'" />
          <text class="cls-2" :transform="'translate(65 265) scale(0.999)'" text-anchor="middle" alignment-baseline="middle"  :class="['center-text', isDark ? 'dark-text' : 'light-text']">
              <tspan :x="165" :y="-10" :style="{ fontSize: 'calc(13px + 4vw)'}">{{ MKinfo.factor }}</tspan>
              <tspan :x="165" :y="7" :style="{ fontSize: 'calc(9px + 2vw)'}">{{ MKinfo.name }}</tspan>
          </text>
          </g>
      </g>
      
      <g class="button" @click="this.$emit('clickedBtn', 'degree');">
          <rect class="cls-5" x="342.5" y="600.5" width="165" height="90" rx="29.2" ry="29.2" transform="translate(-260 1030) rotate(-90)" />
          <g transform="translate(0, 0)">
              <text class="cls-2" text-anchor="middle" x="385" y="591">שינוי</text>
              <text class="cls-2" text-anchor="middle" x="385" y="625">זוית</text>
          </g>
      </g>
      <g id="formula-btn" class="button">
          <rect class="cls-6" x="317.5" y="245" width="70" height="125" rx="17.78" ry="17.78" transform="translate(60 605) rotate(-90)" />
          <text class="cls-2" transform="translate(280 280) scale(0.999)">
              <tspan x="135" y="-19.5">נוסחאות</tspan>
          </text>
      </g> 
    </g>
  </svg>
</template>

<script>
  export default {
  name: "calculator-svg",
  props: ['darkMode','MKinfo'],
  data() {
      return {
          childrenArr: [],
          chosenBtn: '',
      }
  },
  computed: {
      isDark() {
      return this.darkMode;
      },
      MKfound() {
      return this.MKinfo;
      },
  },
  methods: {
    addListeners() {
      this.$emit('clickedBtn', 'ground');
      const buttonGroups = document.querySelectorAll(".button");
      const formulaBtn = document.getElementById("formula-btn");
      const groundBtn = document.getElementById("ground-btn");
      formulaBtn.addEventListener("click", () => {
          this.$emit('clickedBtn', 'formula');
          buttonGroups.forEach((button) => {
          button.addEventListener("click", this.getInfo);
         });
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
  font-size: calc(15px + 4vw);
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
  font-size: calc(15px + 10vw);
}

.dark-mode .cls-3,
.dark-mode .cls-4 {
  font-family: 'Heebo';
}

.dark-mode .cls-4 {
  font-size: calc(15px + 7vw);
}

.dark-mode .cls-6 {
  fill: #fbb03b;
}
.dark-mode .background {
fill: #000; 
}

.light-mode .cls-1 {
  fill: #2e4a4a61;
}

.light-mode .cls-2 {
  font-family: 'OpenSansHebrew';
  font-size: calc(15px + 4vw);
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
  font-size: calc(15px + 10vw);
}

.light-mode .cls-3,
.light-mode .cls-4 {
  font-family: 'Heebo';
}

.light-mode .cls-4 {
  font-size: calc(15px + 7vw);
}

.light-mode .cls-6 {
  fill: #e6e6e6;
}
.light-mode  .light-text {
  fill: #ffffff;
  font-size: calc(15px + 7vw);
  opacity: 1;
}

.light-mode  .differentSize,
.dark-mode  .differentSize {
  font-size: calc(15px + 4vw) !important;
  font-family: 'OpenSansHebrew';
}
.light-mode .background {
fill: #fff; 
}


.light-button {
  fill: rgba(171, 53, 53, 0.651);
}

.dark-button {
fill: rgb(196, 154, 122); 
}

</style>