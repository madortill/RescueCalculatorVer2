<template>
    <div id="calculating-container" >
        <div :class="darkMode ? 'dark-mode' : 'light-mode'">
            <div v-if="!MKnumber && !clickedStates.ground && !afterDelete" class='guidance'>בחרו סוג קרקע</div>
            <div v-else-if="showGuidance && !chosenFormula && !clickedStates.formula && !clickedStates.ground && !afterDelete" class='guidance'>בחרו נוסחא</div>
        </div>
        
        <div class="ground-container" v-show="clickedStates.ground" :class="darkMode ? 'dark-mode' : 'light-mode'">
            <div
                class="item"
                v-for="(ground, index) in groundTypesArr" 
                :key="index" 
                @click="chooseGround(ground)">
                {{ ground.name }}
            </div>
        </div>

        <div class="formula-container" v-show="clickedStates.formula" :class="darkMode ? 'dark-mode' : 'light-mode'">
            <div 
                class="formula-options" 
                v-for="(formula, index) in formulasArr" 
                :key="index" 
                @click="chooseFormula(formula)">
                {{ formula.name }}
            </div>
        </div>

        <div class="degree-outer-container" v-show="clickedStates.degree" :class="darkMode ? 'dark-mode' : 'light-mode'">
            <div v-if="degreeFlag">
                <div class="degreeTitle">תרצו לשנות את כיוון הזוית?</div>
                <div class="degree-inner-container">
                    <div class="item" @click="changeDegreeFlag">כן</div>
                    <div class="item" @click="close">לא</div>
                </div>
            </div>
            <div v-else-if="showOptions">
                <div class="degreeTitle">בחרו את הזוית הרצויה</div>
                <div class="degree-inner-container">
                    <div
                        class="item" 
                        v-for="(degree, index) in degreeFactorsArr" 
                        :key="index" 
                        @click="chooseDegree(degree)">
                        {{ degree.degree }}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="charStyle" :class="darkMode ? 'dark' : 'light'" v-show="!clickedStates.formula && !clickedStates.ground && !clickedStates.degree">
            {{ chosenFormula.name }}
        </div>
        <div class="calc" :class="darkMode ? 'dark' : 'light'" ref="formulaContainer" v-show="!clickedStates.formula && !clickedStates.ground && !clickedStates.degree" @click="handlePlaceholderClick">
            <div v-show="!errorMessage" v-html="renderFormula()"></div>
            <span v-show="!errorMessage && result"> = {{ result }}</span>
            <div v-show="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>

    </div>
</template>

<script>

export default {
name: "calculating-container",
props: ['chosenValueString', 'clickedStates', 'darkMode', 'stringBtn'], 
data() {
  return {
    showGuidance: false,
    MKnumber: null,
    MTSnumber: null,
    degreeNum: null,
    degreeFactor: null,
    afterDelete: false,
    safetyFactor: 1.25,
    formulasArr: [
        {
            name: 'התנגדות לחילוץ עד 45 מעלות',
            formula: '(safetyFactor x (MKnumber x MTSnumber) + (MTSnumber x degreeNum / 60)) x degreeFactor',
        },
        {
            name: 'התנגדות לחילוץ מעל 45 מעלות',
            formula: '(safetyFactor x ((MKnumber x MTSnumber) + MTSnumber)) x degreeFactor',
        },
        {
            name: 'התנגדות לחילוץ במישור',
            formula: '(safetyFactor x (MKnumber x MTSnumber)) x degreeFactor',
        },
        {
            name: 'התנגדות להיפוך - חוק היפוך הרכב',
            formula: '(MTSnumber x 2 / 3) x degreeFactor',
        }
    ],
    groundTypesArr: [
        {name: 'כביש', factor: 0.04},
        {name: 'אדמה קשה', factor: 0.1},
        {name: 'חצץ', factor: 0.2},
        {name: 'חול', factor: 0.25},
        {name: 'בוץ קל', factor: 0.333},
        {name: 'בוץ כבד', factor: 0.5},
        {name: 'בוץ דביק', factor: 0.66}
    ],
    degreeFactorsArr: [
        {degree: 180, factor: 1},
        {degree: 120, factor: 1},
        {degree: 90, factor: 1.4},
        {degree: 60, factor: 1.7},
        {degree: 30, factor: 2},
    ],
    chosenFormula: '',
    chosenFormulaCalc: null,
    chosenCalc: null,
    localChosenBtn: this.chosenValueString,
    localString: null,
    newInput: false,
    insertedValues: {}, // Store the inserted values for each variable
    placeholders: {} ,// Store the placeholders so we can update them simultaneously
    errorMessage: '',
    selectedPlaceholder: null,
    intervalId: null,
    result: null,
    calculationTriggered: false, // Tracks if "=" was clicked
    degreeFlag: true,
    showOptions: false,
  };
},
watch: {
    MKnumber: 'updateResult',
    MTSnumber: 'updateResult',
    degreeNum: 'updateResult',
    chosenFormula: 'updateResult',

    chosenValueString(newVal) {
        // Extract the most left digit
        this.localChosenBtn = newVal.charAt(0);
        this.alertUpdate();
    },
    stringBtn(newVal) {
        if (newVal.includes("=")) {
            this.localString = "=";
            this.handleButtonPress(this.localString);
        } else {
            const match = newVal.match(/^[a-zA-Zא-ת]+/); 
            this.localString = match ? match[0] : '';
        }
    }
},
computed: {
    updatedChosenBtn() {
        return this.localChosenBtn;
    },
    updateStringBtn() {
        return this.stringBtn;
    },
    calculatedResult() {
    if (!this.chosenFormula || !this.chosenFormula.formula) {
        return null; // No formula selected
    }

    const formulaVariables = {
        MKnumber: this.MKnumber,
        MTSnumber: this.MTSnumber,
        degreeNum: this.degreeNum,
        safetyFactor: this.safetyFactor,
        degreeFactor: this.degreeFactor || 1 // Default to 1 if not used
    };

    const missingVariables = [];
    const variableLabels = {
        MKnumber: 'מקדם קרקע',
        MTSnumber: 'משקל ציוד',
        degreeNum: 'זוית השיפוע',
        safetyFactor: 'מקדם בטיחות'
    };

    for (const variable of Object.keys(formulaVariables)) {
        if (
            this.chosenFormula.formula.includes(variable) &&
            formulaVariables[variable] === null
        ) {
            missingVariables.push(variableLabels[variable]);
        }
    }

    if (missingVariables.length) {
        this.errorMessage = ` יש להשלים את הנתונים הבאים: ${missingVariables.join(', ')}`;
        return null;
    }

    try {
        const formulaString = this.chosenFormula.formula.replace(/x/g, '*');
        const formulaWithValues = formulaString.replace(
            /(MKnumber|MTSnumber|degreeNum|safetyFactor|degreeFactor)/g,
            (match) => formulaVariables[match]
        );
        return eval(formulaWithValues);
    } catch (error) {
        console.error('Error in calculation:', error);
        this.errorMessage = 'אופס... משהו השתבש, לחצו על כפתור "איפוס" כדי לחשב מחדש';
        return null;
    }
 }
},
methods: {
    changeDegreeFlag() {
        setTimeout(() => {
            this.degreeFlag = false;
            this.showOptions = true;
        },750)  
    },
    close() {
        setTimeout(() => {
            this.$emit("clickedBtn", "degree");
        },750)  
    },
    chooseFormula(formula) {
        setTimeout(() => {
            this.chosenFormula = formula;
            this.$emit("clickedBtn", "formula");
        },750)
        
    },
    chooseGround(ground) {
        setTimeout(() => {
            this.MKnumber = ground.factor;
            this.showGuidance = true;
            this.$emit("MKinfo", ground);
            this.$emit("clickedBtn", "ground");
            // this.$emit("resetButtonState");
        },750)  
    },
    chooseDegree(degree) {
        setTimeout(() => {
            this.degreeFactor = degree.factor;
            this.updateResult();
            this.$emit("DegreeInfo", degree);
            this.$emit("clickedBtn", "degree");
            this.degreeFlag = true;
            // this.$emit("resetButtonState");
        },750)  
    },
    renderFormula() {
        if (!this.chosenFormula || typeof this.chosenFormula.formula !== 'string') {
            return ' '; // Return blank if no formula is chosen
        }

        if (this.localString === 'מחק') {
            this.resetFormulaInputs(); // Reset inputs
            return this.renderPlaceholderFormula(); // Re-render formula with placeholders
        }

        if (this.localString === 'איפוס') {
            // resets the "page" as if it was just entered.
            this.$emit("reset");
        }

        let formula = this.chosenFormula.formula;
        const variableLabels = {
            MKnumber: 'מקדם קרקע',
            MTSnumber: 'משקל ציוד',
            degreeNum: 'זוית השיפוע',
            safetyFactor: '1.25', // Default value for safetyFactor
            degreeFactor: 'מקדם שיפוע' // Label for degreeFactor
        };

        const variables = {
            MKnumber: this.MKnumber,
            MTSnumber: this.MTSnumber,
            degreeNum: this.degreeNum,
            safetyFactor: this.safetyFactor,
            degreeFactor: this.degreeFactor // Include degreeFactor in the variables
        };

        const modeClass = this.darkMode ? 'dark-mode' : 'light-mode';

        Object.keys(variables).forEach((key) => {
            let value;
            if (key === 'safetyFactor') {
                value = variableLabels[key]; // Always use default value for safetyFactor
            } else if (key === 'degreeFactor') {
                value = variables[key] !== null 
                    ? variables[key] 
                    : ''; // Hide if not used
            } else {
                value =
                    variables[key] !== null
                        ? variables[key]
                        : `<span class="placeholder ${modeClass}" data-var="${key}">${variableLabels[key]}</span>`;
            }
            formula = formula.split(key).join(value);
            formula = formula.replace(/\s*x\s*\*?\s*(מקדם שיפוע|degreeFactor)/g, (match, p1) => p1);
            if (this.degreeFactor) {
                formula = formula.replace(/(?<=\s*)degreeFactor/g, ` x ${this.degreeFactor}` );
            }

        });
        return formula;
    },
    renderPlaceholderFormula() {
        let formula = this.chosenFormula.formula;
        const variableLabels = {
            MKnumber: `${this.MKnumber}`,
            MTSnumber: 'משקל ציוד',
            degreeNum: 'זוית השיפוע',
            safetyFactor: '1.25' // Default value for safetyFactor
        };
        const modeClass = this.darkMode ? 'dark-mode' : 'light-mode';
        Object.keys(variableLabels).forEach((key) => {
            if (key === 'safetyFactor' || key === 'MKnumber') {
                formula = formula.split(key).join(variableLabels[key]); // Use default value for safetyFactor
            } else {
                const placeholder = `<span class="placeholder ${modeClass}" data-var="${key}">${variableLabels[key]}</span>`;
                formula = formula.split(key).join(placeholder);
            }
        });
        return formula;
    },
    resetFormulaInputs() {
         // Reset variables to null or initial state
        this.MTSnumber = null;
        this.degreeNum = null;
        this.localChosenBtn = '';
        this.afterDelete = true;
        this.localString = '';
        this.result= null;
        this.calculationTriggered = false; // Reset calculation flag
        // Clear the active interval if any
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null; // Ensure the reference is removed
        }
        // Deselect any active placeholder
        if (this.selectedPlaceholder) {
            this.selectedPlaceholder.textContent = ''; // Clear displayed content
            this.selectedPlaceholder = null;
        }
        // Trigger a re-render
        this.$nextTick(() => {
            this.renderPlaceholderFormula(); // Re-render the formula with placeholders
        });
    },
    alertUpdate() {
        this.newInput = true;
    },
    validateDegreeNum(value) {
    if (value > 45) {
        this.degreeNum = null; // Clear the input
        this.errorMessage = 'שימו לב, הזוית צריכה להיות קטנה יותר מ-45 מעלות, אנא הכניסו ערך תקין';
        setTimeout(() => {
        this.errorMessage = ''; // Clear the error message after a short delay
        }, 4500);
    } else {
        this.degreeNum = value;
    }
    },
    handlePlaceholderClick(event) {
    if (event.target.classList.contains("placeholder")) {
        const variable = event.target.getAttribute('data-var');
        if (!variable || variable === 'safetyFactor') return; // Do not allow editing safetyFactor
        if (this.selectedPlaceholder && this.selectedPlaceholder !== event.target) {
        clearInterval(this.intervalId); // Stop the interval
        if (this.currentInput) {
            if (variable === 'degreeNum') {
            this.validateDegreeNum(parseFloat(this.currentInput)); // Validate degreeNum
            } else {
            this[variable] = parseFloat(this.currentInput); // Save the previous value
            }
        }
        }
        this.selectedPlaceholder = event.target;
        this.currentInput = ''; // Reset input for the new placeholder
        if (this.intervalId) {
        clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(() => {
        if (this.updatedChosenBtn !== null && this.newInput) {
            // Add the button value and reset flag
            this.currentInput += this.updatedChosenBtn;
            this.newInput = false;
        }
        if (this.selectedPlaceholder !== null) {
            this.selectedPlaceholder.textContent = this.currentInput;
        }

        if (this.currentInput.length === 7) {
            clearInterval(this.intervalId);
            if (variable === 'degreeNum') {
            this.validateDegreeNum(parseFloat(this.currentInput)); // Validate degreeNum
            } else {
            this[variable] = parseFloat(this.currentInput); // Save the final value
            }
        }
        }, 250); // Adjust speed if needed
    } else {
        // User clicked outside a placeholder
        if (this.selectedPlaceholder) {
        const variable = this.selectedPlaceholder.getAttribute('data-var');
        clearInterval(this.intervalId); // Stop the interval
        if (this.currentInput) {
            if (variable === 'degreeNum') {
            this.validateDegreeNum(parseFloat(this.currentInput)); // Validate degreeNum
            } else {
            this[variable] = parseFloat(this.currentInput); // Save the value
            }
        }
        this.selectedPlaceholder = null; // Reset the placeholder
        }
        }
    },
    handleCalculation() {
        // Extract variable names used in the formula
        const formulaVariables = ['MKnumber', 'MTSnumber', 'degreeNum', 'safetyFactor'];
        const missingVariables = [];
        const variableLabels = {
            'MKnumber': 'מקדם קרקע',
            'MTSnumber': 'משקל ציוד',
            'degreeNum': 'זוית השיפוע',
            'safetyFactor': 'מקדם בטיחות'
        }

        // Check for missing variables in the chosen formula
        formulaVariables.forEach(variable => {
            if (this.chosenFormula.formula.includes(variable) && (this[variable] === null || this[variable] === undefined)) {
                missingVariables.push(variableLabels[`${variable}`]);
            }
        });

        // If there are missing variables, show an error
        if (missingVariables.length > 0) {
            this.errorMessage = ` לצורך החישוב יש להכניס את הנתונים הבאים: ${missingVariables.join(', ')}`;
            setTimeout(() => {
                this.errorMessage = ''; // Clear the error message after a delay
            }, 4500);
            return;
        }
        this.calculationTriggered = true;
        this.updateResult(); // Trigger the calculation immediately
        },

    updateResult() {
    if (!this.calculationTriggered) return;

    try {
        // Dynamically evaluate the formula
        const variables = {
            MKnumber: this.MKnumber,
            MTSnumber: this.MTSnumber,
            degreeNum: this.degreeNum,
            safetyFactor: this.safetyFactor,
            degreeFactor: this.degreeFactor ?? 1 // Default to 1 if undefined
        };

        // Start with the chosen formula
        let formulaString = this.chosenFormula.formula;
        // console.log(formulaString)

        // Replace 'x' with '*' for multiplication and inject variable values
        formulaString = formulaString.replace(/x/g, '*')
            .replace(/(MKnumber|MTSnumber|degreeNum|safetyFactor|degreeFactor)/g, match => variables[match] ?? match);

        

        // Safely evaluate the final formula
        this.result = eval(formulaString);
        this.$emit("calculatedResult", this.result);
        setTimeout( () => {
            this.$emit("nextScreen", 2);        
        }, 0);

    } catch (error) {
        console.error('Error evaluating formula:', error);
        this.errorMessage = 'החישוב נכשל, בדקו את הנתונים ואת הנוסחא';
        setTimeout(() => {
            this.errorMessage = '';
        }, 4500);
    }
},
handleButtonPress(value) {
        if (value === "=") {
            // Ensure all required values are up-to-date
            this.saveInputValues();

            // Trigger the calculation
            this.handleCalculation();
        } else {
            // Save non-equal button presses (e.g., numbers or operations)
            this.localChosenBtn = value.trim();
            this.newInput = true;
        }
    },

    saveInputValues() {
        // Collect and validate any pending inputs
        if (this.selectedPlaceholder) {
            const variable = this.selectedPlaceholder.getAttribute('data-var');
            if (this.currentInput && variable) {
                // Save and trim input
                const trimmedInput = this.currentInput.trim();
                if (variable === 'degreeNum') {
                    this.validateDegreeNum(Number(trimmedInput));
                } else {
                    this[variable] = Number(trimmedInput); // Save as a number
                }
                this.selectedPlaceholder = null;
                this.currentInput = '';
            }
        }
    },
},
mounted() {
    const calcContainer = this.$refs.formulaContainer;
        
    calcContainer.addEventListener('touchstart', this.handlePlaceholderClick, false);
    calcContainer.addEventListener('touchend', this.handlePlaceholderClick, false);
},
created() {
        this.localString = this.stringBtn || ''; // Initialize `localString` with `stringBtn` value
    },
    beforeDestroy() {
        const calcContainer = this.$refs.formulaContainer;
        calcContainer.removeEventListener('touchstart', this.handlePlaceholderClick, false);
        calcContainer.removeEventListener('touchend', this.handlePlaceholderClick, false);

        if (this.intervalId) {
        clearInterval(this.intervalId);
        }
    }
};
</script>

<style scoped>
@font-face {
  font-family: 'Heebo';
  src: url(/src/assets/fonts/Heebo/Heebo-Regular.ttf);
} 

#calculating-container {
    width: 92%;
    height: 23%;
    position: absolute;
    top: 1.75rem;
    right: 50%;
    transform: translateX(50%);
    border-radius: 2rem;
    font-size: 1.1rem;
    font-weight: 550;
    font-family: 'OpenSansHebrew';
}

.charStyle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    text-align: center;
    font-size: 1.65rem;
    color: white;
    font-weight: 600;
}

.light {
    color: #a43b49 !important;
}

.formula-container {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 15px;
    width: 100%;
    height: 100%;

}

.formula-options {
    padding: 0.25rem;
    width: 75%;
    border-radius: 15px;
    margin: 0.1rem;
    z-index: 23;
    color: black;
}

.light-mode .formula-options {
    background-color: rgba(246, 153, 102, 0.358);
    color:  #591b10c7;
}

.dark-mode .formula-options {
    background-color: rgba(123, 114, 114, 0.498);
    color:  #ffffff;
}



.ground-container {
    position: absolute;
    top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    border-radius: 15px;
    width: 100%;
}

.degree-outer-container {
    position: absolute;
    top: 3.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    border-radius: 15px;
    width: 100%;
}

.degree-inner-container {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    text-align: center;
    border-radius: 15px;
    width: 100%;
}

.item {
    padding: 0.7rem;
    margin: 0.3rem;
    border-radius: 15px;
    margin-top: 0.25rem;
    z-index: 23;
    color: black;
}

.formula-options,
.item {
    transition: transform 0.3s ease-in, background-color 0.3s ease-in;
}

.formula-options:hover {
    background-color: rgba(255, 228, 192, 0.841);
    transform: scale(1.05); 
}

.light-mode .item:hover{
    background-color: rgba(255, 228, 192, 0.841);
    transform: scale(1.05); 
}

.dark-mode .item:hover {
    background-color: rgba(166, 149, 128, 0.841);
    transform: scale(1.05); 
}
.light-mode .item {
    background-color: rgba(246, 153, 102, 0.358);
    color:  #591b10c7;
}

.dark-mode .item {
    background-color: rgba(123, 114, 114, 0.498);
    color:  #ffffff;
}


.guidance {
    text-align: center;
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 600;
}

.dark-mode .guidance {
    color: white;
}
.light-mode .guidance {
    color: #406767db;
}

.calc {
    direction: ltr;
    text-align: left;
    margin-top: 5rem;
    font-family: 'Heebo';
}
.dark {
    color: rgb(255, 255, 255);
}
.error-message {
  color: rgb(222, 67, 53);
  margin-top: 0.2rem;
  text-align: center;
  direction: rtl;
  
}

.degreeTitle {
    position: absolute;
    width: 100%;
    top: -2rem;
    right: 50%;
    transform: translateX(50%);
    font-size: 1.5rem;
    font-weight: 600;
}

.dark-mode .degreeTitle {
    color: white;
}

.light-mode .degreeTitle {
    color:#406767db;
}
</style>

<style>
.placeholder {
    display: inline-block;
    background-color: transparent; /* No background color to blend with the input area */
    color: #666; /* Default text color */
    padding: 0.4rem;
    border-bottom: 2px solid #aaa; /* Underline for better emphasis */
    font-style: italic; /* To indicate it's a placeholder */
    text-align: center;
    cursor: pointer; /* Indicate that it is clickable */
    transition: all 0.3s ease-in-out;
}

/* Dark mode styling */
.dark-mode .placeholder {
    color: #ddd; /* Light text color for dark mode */
    border-bottom: 2px solid #bbb; /* Lighter border for contrast */
}

/* Light mode styling */
.light-mode .placeholder {
    color: #333; /* Darker text color for light mode */
    border-bottom: 2px solid #888; /* Darker border for better contrast */
}

.placeholder:hover {
    color: #0056b3; /* Change color on hover */
    border-bottom-color: #0056b3; /* Highlight the underline on hover */
}

@keyframes clickme {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
</style>