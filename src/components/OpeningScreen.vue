<template>
    <div id="opening-screen" :class="darkMode ? 'dark-mode' : 'light-mode'">
        <img class="madortill" src="/src/assets/media/madortill.png" alt="icon" />

        <div v-if="page === 0" class="open-page">
            <div class="title">ברוכים הבאים למחשבון חישוב התנגדות לחילוץ!</div>
            <div class="button upper" @click="goNext">יאללה נתחיל!</div>
        </div>

        <div v-else-if="page === 1" class="continue-page page-conatiner">
            <div class="text">
                נהג חילוץ יקר, בעת הגעה לאירוע חילוץ מסוג משיכה יש לזכור כי ישנם כמה פרמטרים חשובים אותם יש לבדוק טרם החילוץ:
            </div>
            <div class="container-checklist">
                <div
                    class="item"
                    v-for="(item, index) in checklist"
                    :key="item"
                    :style="getChecklistAnimationStyle(index)"
                >
                    {{ item }}
                </div>
            </div>
            <div class="button fixed" @click="goNext">המשך</div>
        </div>

        <div v-else class="continue-page page-conatiner">
            <div class="text">
                לאחר שבדקתם את כל אלו, תוכלו להשתמש במחשבון! <br /><br />
                עליכם להשתמש בכפתורים שנמצאים במחשבון על מנת להכניס את הערכים הרצויים לנוסחא שבחרתם. <br /><br />
                לאחר מכן תוכלו לחשב את תוצאת ההתנגדות שיש להפעיל, בהתאם לנוסחאות החילוץ.
            </div>
            <div class="button fixed" @click="startCalc">המשך</div>
        </div>
    </div>
</template>

<script>
export default {
  name: "opening-screen",
  props: ["darkMode"],
  data() {
    return {
      page: 0,
      checklist: [
        "משקל הרכב אותו נדרש לחלץ",
        "סוג הקרקע",
        "זווית המשיכה (שיפוע הקרקע)",
        "האם נדרש שינוי זווית",
      ],
    };
  },
  methods: {
    goNext() {
        setTimeout( () => {
            this.page++;
        }, 750)
    },
    startCalc() {
        setTimeout( () => {
            this.$emit("nextScreen");
        }, 750)
    },
    getChecklistAnimationStyle(index) {
      return {
        animationDelay: `${index * 0.5}s`,
        animationDuration: "0.9s",
      };
    },
  },
};
</script>

<style scoped>
/* General Styles */
#opening-screen {
    width: 100%;
    height: 100%;
    font-family: "OpenSansHebrew";
    text-align: center;
    overflow: hidden;
}

.open-page,
.continue-page {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}


.title {
    position: absolute;
    top: 9rem;
    font-size: 2.2rem;
    font-weight: bold;
    text-align: center;
    margin: 0.85rem;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    border-radius: 1rem;
    animation: float 3s ease-in-out infinite;
}

/* Buttons */
.button-container {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    top: 17rem;
    width: 87%;
    height: 50%;
    margin: 0.85rem;
    border-radius: 1rem;
    border: 2px solid rgb(255, 255, 255);
}

.button {
    padding: 0.75rem;
    border-radius: 20px;
    font-size: 1.6rem;
    transition: transform 0.8s, background-color 0.8s;
}

.button:active {
    transform: scale(0.9);
}

.upper {
    position: absolute;
    bottom: 10rem;
}

.fixed {
    position: absolute;
    bottom: -5rem;
}

.dark-mode .button {
    border: 2px solid  rgb(250, 182, 57);
    color:  rgb(250, 182, 57);;
}

.light-mode .button {
    border: 2px solid rgb(228, 118, 137);
    color: rgb(192, 113, 126);
}

/* Checklist Items */
.container-checklist {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
}

.page-conatiner {
    /* margin-top: 1rem; */
    position: absolute;
    top: 0;
    width: 100%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.item {
    margin: 0.4rem;
    padding: 0.7rem;
    border-radius: 1rem;
    font-size: 1.2rem;
    opacity: 0;
    animation-name: fade-in;
    animation-fill-mode: forwards;
}

.dark-mode .item {
    color: rgb(245, 154, 63);
    border: 2px solid 
}

.light-mode .item {
    color: #ffffff;
    /* border: 2px solid #6f9a9ac2; */
    background-color: #629f9f5f;
}



/* Animations */
@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Dark and Light Modes */
.dark-mode {
    background: black;
    color: white;
}

.light-mode {
    background: white;
    color: black;
}

.dark-mode .title {
    color: rgb(250, 182, 57);
}

.light-mode .title {
    color: rgb(62, 112, 108);
}

/* Mobile Optimization */
.madortill {
    width: 3.5rem;
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
}

.dark-mode .madortill {
    filter: invert(1) brightness(2);
}

.text {
    /* position: absolute; */
    /* top: 2rem; */
    margin: 2rem;
    padding: 1rem;
    border-radius: 20px;
    font-size: 1.2rem;
}

.light-mode .text {
    background-color: rgba(255, 192, 203, 0.173);
}

</style>
