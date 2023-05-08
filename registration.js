var user_registrationElem = document.querySelector('.reg_number')
var btnAdd = document.querySelector(".btnAdd")
var container = document.querySelector('.container')
const dropdownSlected = document.querySelector("select");


let createDiv = ''
let createSpan = ''
if (localStorage['user-registration']) {
    var storeRegistrations = localStorage['user-registration']
}

function displayRegistrations(registration) {
    createDiv = document.createElement('div')
    createSpan = document.createElement('SPAN')
    createSpan.textContent = registration
    createDiv.appendChild(createSpan)
    container.appendChild(createDiv)
    createDiv.classList.add('displayReg')
}

var factory_instance = FactoryRegistration()

btnAdd.addEventListener('click', function () {

    var user_registration = user_registrationElem.value.trim()

    if (user_registration !== '') {
        factory_instance.addRegistrations(user_registration)
        localStorage['user-registration'] = factory_instance.getRegistrations()
        displayRegistrations(user_registration)
    }
})
dropdownSlected.addEventListener('change', (event) => {
    container.innerHTML = ''
    const {
        value,
    } = event.target.options[event.target.selectedIndex]

    var selectedTownList = factory_instance.selectTown(value)

    console.log(selectedTownList)
    console.log(localStorage['user-registration']);

    var selectedTownListItem = ''
    for (var i = 0; i < selectedTownList.length; i++) {
        selectedTownListItem = selectedTownList[i]
    displayRegistrations(selectedTownListItem)
    }

})
