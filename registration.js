var user_registrationElem = document.querySelector('.reg_number')
var btnAdd = document.querySelector(".btnAdd")
var btnClear = document.querySelector('.btnClear')
var container = document.querySelector('.container')
const dropdownSlected = document.querySelector("select");

let createDiv = ''
let createSpan = ''
function displayRegistrations(registration) {
    createDiv = document.createElement('div')
    createSpan = document.createElement('SPAN')
    createSpan.textContent = registration
    createDiv.appendChild(createSpan)
    container.appendChild(createDiv)
    createDiv.classList.add('displayReg')
}
var storeRegistrations = [];

if (localStorage['user-registration']) {
    storeRegistrations = JSON.parse(localStorage['user-registration'])
}

var factory_instance = FactoryRegistration(storeRegistrations)

btnAdd.addEventListener('click', function () {
    var user_registration = user_registrationElem.value.trim()
    if (user_registration !== '') {
        factory_instance.validRegistration(user_registration)
        factory_instance.addRegistrations(user_registration)
        localStorage['user-registration'] = JSON.stringify(factory_instance.getRegistrations())
        displayRegistrations(user_registration)
    }
    user_registrationElem.value = ''
})

dropdownSlected.addEventListener('change', (event) => {
    container.innerHTML = ''
    const {
        value,
    } = event.target.options[event.target.selectedIndex]
    var selectedTownList = factory_instance.selectTown(value)
    localStorage[value] = factory_instance.selectTown(value)
    for (var i = 0; i < selectedTownList.length; i++) {
        localStorage[value] = selectedTownList[i]
        displayRegistrations(selectedTownList[i])
    }
})

if (storeRegistrations){
    for (var i = 0; i < storeRegistrations.length; i++) {
        displayRegistrations(storeRegistrations[i])
    }
}

btnClear.addEventListener('click', function() {
   factory_instance.clear();
   location.reload();
})