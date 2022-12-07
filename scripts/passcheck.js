// timeout before a callback is called

let timeout;

// traversing the DOM and getting the input and span using their IDs

let password = document.getElementById('PassEntry')
let strengthBadge = document.getElementById('StrengthDisp')
let entropyBadge = document.getElementById('EntropyDisp')
entropyBadge.style.color = 'black'

function showPassword() {
    let x = password;
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

const calcEntropy = (charset, length) =>
  Math.round(length * Math.log(charset) / Math.LN2)

const stdCharsets = [{
    name: 'lowercase',
    re: /[a-z]/, // abcdefghijklmnopqrstuvwxyz
    length: 26
}, {
    name: 'uppercase',
    re: /[A-Z]/, // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    length: 26
}, {
    name: 'numbers',
    re: /[0-9]/, // 1234567890
    length: 10
}, {
    name: 'symbols',
    re: /[^a-zA-Z0-9]/, //  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ (and any other)
    length: 33
}]

const calcCharsetLengthWith = charsets =>
  string =>
    charsets.reduce((length, charset) =>
      length + (charset.re.test(string) ? charset.length : 0), 0)

const calcCharsetLength = calcCharsetLengthWith(stdCharsets)
  
const passwordEntropy = string =>
  string ? calcEntropy(calcCharsetLength(string), string.length) : 0

// The strong and weak password Regex pattern checker

let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

function StrengthChecker(PasswordParameter){
    // We then change the badge's color and text based on the password strength

    if(strongPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = "green"
        strengthBadge.textContent = 'Strong'
        entropyBadge.style.backgroundColor = 'green'
        entropyBadge.textContent = 'Entropy: ' + passwordEntropy(PasswordParameter) + ' bits'
    } else if(mediumPassword.test(PasswordParameter)){
        strengthBadge.style.backgroundColor = 'yellow'
        strengthBadge.textContent = 'Medium'
        entropyBadge.style.backgroundColor = 'yellow'
        entropyBadge.textContent = 'Entropy: ' + passwordEntropy(PasswordParameter) + ' bits'
    } else{
        strengthBadge.style.backgroundColor = 'red'
        strengthBadge.textContent = 'Weak'
        entropyBadge.style.backgroundColor = 'red'
        entropyBadge.textContent = 'Entropy: ' + passwordEntropy(PasswordParameter) + ' bits'
    }
}

// Adding an input event listener when a user types to the  password input 

password.addEventListener("input", () => {

    //The badge is hidden by default, so we show it

    strengthBadge.style.display= 'block'
    entropyBadge.style.display= 'block'

    clearTimeout(timeout);

    //We then call the StrengChecker function as a callback then pass the typed password to it

    timeout = setTimeout(() => StrengthChecker(password.value), 500);

    //Incase a user clears the text, the badge is hidden again

    if(password.value.length !== 0){
        strengthBadge.style.display != 'block'
        entropyBadge.style.display != 'block'
    } else{
        strengthBadge.style.display = 'none'
        entropyBadge.style.display = 'none'
    }
});