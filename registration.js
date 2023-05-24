var user_registrationElem = document.querySelector('.reg_number')
var btnAdd = document.querySelector(".btnAdd")
var btnClear = document.querySelector('.btnClear')
var container = document.querySelector('.container')
var errorDisplay = document.querySelector('.error')
var errorDisplayTwo = document.querySelector('.noTown')

var dropdownSlected = document.querySelector("select");

var createDiv = ''
var createSpan = ''
var errorTimeout;
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
        errorDisplay.innerHTML = message
        errorDisplay.style.padding = '5px'
        errorDisplay.classList.add(className)
        errorDisplay.classList.remove('hidden')
    } else {
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
            var regs = factory_instance.getRegistrations()
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
    var regex = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/ // Example regex to allow only varters and spaces
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
    var { value } = event.target.options[event.target.selectedIndex]
    console.log(value);
    var selectedTownList = factory_instance.selectTown(value)
    console.log(selectedTownList);
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
  
    if (confirm('Are you sure you want to clear all registrations?') ) {
        localStorage.clear();
        displayMessages2('Reset successful!', 'green')

    }
    // location.reload()

})
