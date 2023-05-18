var user_registrationElem = document.querySelector('.reg_number')
const inputs = document.querySelector("input");
var btnAdd = document.querySelector(".btnAdd")
var btnClear = document.querySelector('.btnClear')
var container = document.querySelector('.container')
var errorDisplay = document.querySelector('.error')
var errorDisplayTwo = document.querySelector('.noTown')

const dropdownSlected = document.querySelector("select");

let createDiv = ''
let createSpan = ''
let errorTimeout;
function displayRegistrations(registration) {
    createDiv = document.createElement('div')
    createSpan = document.createElement('span')
    createSpan.textContent = registration
    createDiv.appendChild(createSpan)
    container.appendChild(createDiv)
    createDiv.classList.add('displayReg')
}

function displayMessages1(message, className) {
    if (message) {
        console.log(".")
        errorDisplay.innerHTML = message
        errorDisplay.style.padding = '5px'
        errorDisplay.classList.add(className)
        errorDisplay.classList.remove('hidden')
    } else {
        // alert("!");
        errorDisplay.classList.add('hidden')
        errorDisplay.style.padding = '0px'
    }
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorDisplay.classList.add('hidden')
        errorDisplay.style.padding = ''
        errorDisplay.classList.remove(className)
        errorDisplay.innerHTML = ''
    }, 3000)
}

function displayMessages2(message, className) {
    errorDisplayTwo.innerHTML = message
    errorDisplayTwo.style.padding = '15px'

    errorDisplayTwo.classList.add(className)
    clearTimeout(errorTimeout);
    errorTimeout = setTimeout(() => {
        errorDisplayTwo.classList.remove(className)
        errorDisplayTwo.innerHTML = ''
        errorDisplayTwo.style.padding = '0px'

    }, 2000)
}

var storeRegistrations = [];
var holder = {}



if (localStorage['user-registration']) {
    storeRegistrations = JSON.parse(localStorage['user-registration'])
}

var factory_instance = FactoryRegistration(storeRegistrations)

btnAdd.addEventListener('click', function () {
    errorDisplay.classList.remove('error')

    var user_registration = user_registrationElem.value.trim().toUpperCase()
    if (factory_instance.errors(user_registration) == '') {
        var validRegistration = factory_instance.validRegistration(user_registration)

        if (validRegistration) {

            var x = factory_instance.addRegistrations(user_registration)
            let regs = factory_instance.getRegistrations()
            localStorage['user-registration'] = JSON.stringify(factory_instance.getRegistrations())

            if (holder[regs] == undefined) {
                displayRegistrations(regs[regs.length - 1])
                holder[regs] = 1
            }
            else {
                displayMessages1('Registration has already been added.', 'green')
            }
        }
        user_registrationElem.value = ''
    }

    else {
        var message = factory_instance.errors(user_registration)
        displayMessages1(message, 'error')
    }
})

user_registrationElem.addEventListener('input', (e) => {
    var regex = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/ // Example regex to allow only letters and spaces
    if (regex.test(e.target.value)) {
        errorDisplay.classList.add('hidden')
        errorDisplay.style.padding = '0px'
        errorDisplay.innerHTML = ''
    } else {
        displayMessages1(factory_instance.errors(e.target.value), 'error')
    }

})

dropdownSlected.addEventListener('change', (event) => {
    errorDisplayTwo.classList.remove('error')
    container.innerHTML = ''
    const { value } = event.target.options[event.target.selectedIndex]
    var selectedTownList = factory_instance.selectTown(value)
    localStorage[value] = factory_instance.selectTown(value)
    console.log((factory_instance.isTownSelected()));

    if (factory_instance.isTownSelected() == '') {
        for (var i = 0; i < selectedTownList.length; i++) {
            localStorage[value] = selectedTownList[i]
            displayRegistrations(selectedTownList[i])
        }
    }
    else {
        clearTimeout(errorTimeout);
        displayMessages2(factory_instance.isTownSelected(), 'error')
    }
})

if (storeRegistrations) {
    for (var i = 0; i < storeRegistrations.length; i++) {
        displayRegistrations(storeRegistrations[i])
    }
}

btnClear.addEventListener('click', function () {
    // setTimeout(() => {
        
    // }, 5000) 
     factory_instance.clear()
    displayMessages2('Reset successful!', 'green')
  createDiv.innerHTML= ''
  container.innerHTML = ''
    // location.reload()

})

