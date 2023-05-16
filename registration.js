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
var storeRegistrations = [];
var holder = {}

if (localStorage['user-registration']) {
    storeRegistrations = JSON.parse(localStorage['user-registration'])
}

var factory_instance = FactoryRegistration(storeRegistrations)

btnAdd.addEventListener('click', function () {
    errorDisplay.classList.remove('error')

    var user_registration = user_registrationElem.value.trim().toUpperCase()
    if (factory_instance.errors(user_registration) == true) {
        var validRegistration = factory_instance.validRegistration(user_registration)

        if (validRegistration) {

            var x = factory_instance.addRegistrations(user_registration)
            let regs = factory_instance.getRegistrations()
            localStorage['user-registration'] = JSON.stringify(factory_instance.getRegistrations())

            if (holder[regs] == undefined) {
                displayRegistrations(regs[regs.length - 1])
                holder[regs] = 1
            }
            else{
                errorDisplay.innerHTML = 'Registration already added!'
                errorDisplay.style.padding = '5px'
                errorDisplay.classList.add('green')
                clearTimeout(errorTimeout);
                errorTimeout = setTimeout(() => {
                    errorDisplay.classList.remove('green')
                    errorDisplay.innerHTML = ''
                }, 4000)
            }
        }
        user_registrationElem.value = ''

    }

    else {
        var message = factory_instance.errors(user_registration)
        errorDisplay.innerHTML = message
        errorDisplay.style.padding = '5px'
        errorDisplay.classList.add('error')
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            errorDisplay.classList.remove('error')
            errorDisplay.innerHTML = ''
        }, 4000)
    }
})

user_registrationElem.addEventListener('input', (e) => {
    // alert(e.target.value)
    var regex = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/ // Example regex to allow only letters and spaces
    if (regex.test(e.target.value)) {
        errorDisplay.innerHTML = ''
    } else {
        errorDisplay.innerHTML = factory_instance.errors(e.target.value)
        errorDisplay.style.padding = '5px'
        errorDisplay.classList.add('error')
        clearTimeout(errorTimeout);
        errorTimeout = setTimeout(() => {
            errorDisplay.classList.remove('error')
            errorDisplay.innerHTML = ''
        }, 2000)
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
        errorDisplayTwo.innerHTML = factory_instance.isTownSelected()
        errorDisplayTwo.style.padding = '5px'
        errorDisplayTwo.classList.add('error')
        // stop any current timeouts
        errorTimeout = setTimeout(() => {
            errorDisplayTwo.classList.remove('error')
            errorDisplayTwo.innerHTML = ''
        }, 2000)

    }
})

if (storeRegistrations) {
    for (var i = 0; i < storeRegistrations.length; i++) {
        displayRegistrations(storeRegistrations[i])
    }
}

btnClear.addEventListener('click', function () {
    factory_instance.clear();
    errorDisplayTwo.innerHTML = 'Clear Successful!'
    errorDisplayTwo.classList.add('green')
    errorDisplayTwo.style.padding = '5px'
    errorTimeout = setTimeout(() => {
        errorDisplayTwo.classList.remove('green')
        errorDisplayTwo.innerHTML = ''
    }, 5000)


})

