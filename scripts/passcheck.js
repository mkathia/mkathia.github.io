// timeout before a callback is called
let timeout;

// Getting the password input and the badge element
let password = document.getElementById('PassEntry')
let strengthBadge = document.getElementById('StrengthDisp')
let entropyBadge = document.getElementById('EntropyDisp')
entropyBadge.style.color = 'black'

// show password function to show password when the box is checked
function showPassword() {
    let x = password;
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// Password entropy function: length times log base 2 of charset length
const calcEntropy = (charset, length) =>
  Math.round(length * Math.log(charset) / Math.LN2)

// Standard character sets
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

// Calculate the length of a character set
const calcCharsetLengthWith = charsets =>
  string =>
    charsets.reduce((length, charset) =>
      length + (charset.re.test(string) ? charset.length : 0), 0)

const calcCharsetLength = calcCharsetLengthWith(stdCharsets)
  
// Calculate the entropy of a string
const passwordEntropy = string =>
  string ? calcEntropy(calcCharsetLength(string), string.length) : 0

// Password strength checker function
function testPassword(pwString) {
    var strength = 0;

    strength += /[A-Z]+/.test(pwString) ? 1 : 0;
    strength += /[a-z]+/.test(pwString) ? 1 : 0;
    strength += /[0-9]+/.test(pwString) ? 1 : 0;
    strength += /[\W]+/.test(pwString) ? 1 : 0;

    entropy = passwordEntropy(pwString)

    if ((passwordEntropy(pwString) > 64) || (strength >= 3)) {
        strengthBadge.style.backgroundColor = "green"
            strengthBadge.textContent = 'Strong'
            entropyBadge.style.backgroundColor = 'green'
            entropyBadge.textContent = 'Entropy: ' + passwordEntropy(pwString) + ' bits'
    } else if ((passwordEntropy(pwString) > 32) || (strength >= 2)) {
        strengthBadge.style.backgroundColor = 'yellow'
        strengthBadge.textContent = 'Medium'
        entropyBadge.style.backgroundColor = 'yellow'
        entropyBadge.textContent = 'Entropy: ' + passwordEntropy(pwString) + ' bits'
    } else {
        strengthBadge.style.backgroundColor = 'red'
        strengthBadge.textContent = 'Weak'
        entropyBadge.style.backgroundColor = 'red'
        entropyBadge.textContent = 'Entropy: ' + passwordEntropy(pwString) + ' bits'
    }
}

// Adding an input event listener when a user types to the  password input 
password.addEventListener("input", () => {

    //The badge is hidden by default, so we show it
    strengthBadge.style.display= 'block'
    entropyBadge.style.display= 'block'

    //We clear the timeout so that the callback is not called until the user stops typing
    clearTimeout(timeout);

    //We then call the StrengthChecker function as a callback then pass the typed password to it
    timeout = setTimeout(() => testPassword(password.value), 500);

    //Incase a user clears the text, the badge is hidden again
    if(password.value.length !== 0){
        strengthBadge.style.display != 'block'
        entropyBadge.style.display != 'block'
    } else{
        strengthBadge.style.display = 'none'
        entropyBadge.style.display = 'none'
    }
});