

let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn  = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");
// indicator
const indicator = document.querySelector("[data-indicator]");
const copyBtn = document.querySelector("[data-copy-btn]");
const copyMsg = document.querySelector("[data-copy-msg]");
// Showing input slider value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener("input", function() {
  sliderValue.textContent = inputSlider.value;
});


genBtn.addEventListener("click", ()=>{
    passBox.value = generatePassword();

     // calculate strength
     calcStrength();
    
});
let password = "";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?/"; 

// Function to generate Password
function generatePassword(){
    let genPassword= "" ;
    let allChars = "";

    allChars  += lowercase.checked ? lowerChars : "";
    allChars  += uppercase.checked ? upperChars : "";
    allChars  += numbers.checked ? allNumbers : "";
    allChars  += symbols.checked ? allSymbols : "";


    if(allChars == "" || allChars.length == 0){
        return genPassword;
    }
    

    let i = 1;
    while(i<=inputSlider.value){
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }

    return genPassword;


}



// copy password
async function copyContent() {
    try {
        // throw error if password is empty
        if(passBox.value == ""){
            alert('First Generate Password to copy');
            throw 'Failed'; 
        }

        await navigator.clipboard.writeText(passBox.value);
        copyMsg.innerText = "Copied";
    } 

    // catch() will only run if any error is thrown by the try block
    catch (error) {
      copyMsg.innerText = error;
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
      copyMsg.classList.remove("active");
    }, 2000);
}
  
copyBtn.addEventListener("click", () => {
    // if (password) copyContent();
    copyContent();
});



// let copy = document.getElementsByClassName("copy-tooltip");
// let cpyimg = document.getElementsById("cpyimg");
   
// cpyimg.addEventListener("click", ()=>{
//       copy.style.opacity = "1";
//       copy.style.transform = "rotate(7deg)";
// }); 




// calculate password strength
// set Indicator
setIndicator("#ccc");
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function calcStrength(){////////////////////////////////////////ewrte
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercase.checked) hasUpper = true;
    if(lowercase.checked) hasLower = true;
    if(numbers.checked) hasNumber = true;
    if(symbols.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && inputSlider.value >= 8){
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && inputSlider.value >= 6){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}
