const inputSlider = document.querySelector("[password-length-slider]")
const lengthDisplay = document.querySelector("[password-length-display]")
const passwordDisplay = document.querySelector("[password-display]")
const copyBtn = document.querySelector("[copy-btn]")
const copyMsg = document.querySelector("[copied-msg]")
// checkboxes
const uppercaseCheck = document.getElementById("for-uppercase")
const lowercaseCheck = document.getElementById("for-lowercase")
const numberCheck = document.getElementById("for-numbers")
const symbolCheck = document.getElementById("for-symbols")

const strengthIndicator = document.querySelector("[password-strength-indicator]")
const generateBtn = document.querySelector("[generate-password-btn]")
const allCheckBoxes = document.querySelectorAll("input[type=checkbox]")

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/'


let password = "" 
let passwordLength = 10
let checkboxCount = 0
// set strengthIndicator to grey :

//slider ke acc lengthDisplat adjust karna 
function handleSlider() {
    // inputSlider.value = passwordLength ;v...fir kya use hua iska ?
    lengthDisplay.textContent = passwordLength
}
handleSlider()

function setIndicatorColor(color) {
     strengthIndicator.style.backgroundColor = color 
    //  shadow 
}

function getRandInt(min , max) {
    return Math.floor((Math.random())*(max-min) + min) 
}

function generateRandomNumber() {
    return getRandInt(0,9)
}

function generateRandomLowercase() {
    return String.fromCharCode(getRandInt(97,97+26))
}

function generateRandomUppercase() {
    return String.fromCharCode(getRandInt(65,65+26))
}

function generateRandomSymbols() {
    return symbols.charAt(getRandInt(0,symbols.length)) 
}

function calcStrength() {
    let hasUpper = uppercaseCheck.checked 
    let hasLower = lowercaseCheck.checked 
    let hasNum = numberCheck.checked 
    let hasSym = symbolCheck.checked
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8)  {
        setIndicatorColor("#0f0")
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
        setIndicatorColor("#ff0");
    } else {
        setIndicatorColor("#f00");
    }
}

// await use karna hai ,& it works only in async func()
async function copyContent() {
    //returns promise , so jab tak ye complete na ho , we want copied na print ho -> so await keyword
    //may give errror / promise reject -> errror handling
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        /*if completed*/ copyMsg.textContent = "Copied"
    }
    catch(e) {
        copyMsg.textContent = "Failed"
    }
    //adding timeOut in copyMsg to dissapear
    copyMsg.classList.add("active") 
    setTimeout(() => {
        copyMsg.classList.remove("active") 
    },2000)
}

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

function handleCheckBoxChange() {
    checkboxCount = 0;
    allCheckBoxes.forEach( (checkbox) => {
        if(checkbox.checked)
            checkboxCount++;
    });

    //special condition
    if(passwordLength < checkboxCount ) {
        passwordLength = checkboxCount;
        handleSlider();
    }
}

allCheckBoxes.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener("input" , (e) => {
    passwordLength = e.target.value
    handleSlider() ;
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener("click", () => {
    if(checkboxCount == 0) 
    return;

    if(passwordLength < checkboxCount) {
        passwordLength = checkboxCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    //remove old password
    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateRandomUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateRandomLowercase);

    if(numberCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolCheck.checked)
        funcArr.push(generateRandomSymbols);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRandInt(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
    //shuffle the password
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    //calculate strength
    calcStrength();

})
