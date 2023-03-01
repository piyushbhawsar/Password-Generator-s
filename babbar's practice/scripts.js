const slider = document.querySelector("[slider]")
const lengthDisplay = document.querySelector("[slider-val-display]")
const passwordDisplay = document.querySelector("[password-display]")
const strengthIndicator = document.querySelector("[strength-indicator]")
// checkboxes
const uppercaseCheck = document.getElementById("for-uppercase")
const lowercaseCheck = document.getElementById("for-lowercase")
const numbersCheck = document.getElementById("for-numbers")
const sybmbolsCheck = document.getElementById("for-symbols")
// buttons
const copyBtn = document.querySelector("[copy-btn]")
const copyMsg = document.querySelector("[copy-msg]")
const generateBtn = document.querySelector("[generate-btn]")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'

let password=""
let passwordLength = 10
lengthDisplay.textContent = 10 ; slider.value = 10

let allCheckboxes = document.querySelectorAll("input[type=checkbox")
let checkboxCount = 0

// slider Event & its val display
slider.addEventListener("input", () => {
    passwordLength = slider.value
    lengthDisplay.textContent = passwordLength
})


// passwordDisplay.value = "yoo"
copyBtn.addEventListener("click", async () => {
    // copy only if password created 
    if(passwordDisplay.value) {
        try{
            await navigator.clipboard.writeText(passwordDisplay.value)
            copyMsg.textContent = "COPIED!"
        }
        catch (e){
            copyMsg.textContent = "Failed"
        }
        copyBtn.classList.add("active")
        setTimeout( () => {
            copyBtn.classList.remove("active")
        },2000)
    }
})

// generating random chars
const getRandInt = (min,max) => { return Math.floor(Math.random()*(max-min) + min) }

const getRandomUppercase = () => { return String.fromCharCode(getRandInt(65,65+26+1)) }

const getRandomLowercase = () => { return String.fromCharCode(getRandInt(97,97+26+1)) }

const getRandomNumber = () => {return getRandInt(0,9)}

const getRandSymbol = () => { return symbols.charAt(getRandInt(0,symbols.length)) }

//counting kitne boxes ticked hai
const handleCheckBoxChange = () => {
    checkboxCount = 0;
    allCheckboxes.forEach( (checkbox) => {
        if(checkbox.checked)
            checkboxCount++;
    });
    //special condition
    if(passwordLength < checkboxCount ) {
        passwordLength = checkboxCount;
        slider.value = passwordLength
        lengthDisplay.textContent = passwordLength
    }
}
allCheckboxes.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

//generate button
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
generateBtn.addEventListener("click", () => {
    if(checkboxCount===0) return

    password = "" //delete karna jaruri hai prev :
    let funcArr = [] 
    if(uppercaseCheck.checked) funcArr.push(getRandomUppercase);

    if(lowercaseCheck.checked) funcArr.push(getRandomLowercase);

    if(numbersCheck.checked) funcArr.push(getRandomNumber);

    if(sybmbolsCheck.checked) funcArr.push(getRandSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandInt(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
    password = shufflePassword(Array.from(password));
    passwordDisplay.value = password;
})
