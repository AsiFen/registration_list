var user_registrationElem = document.querySelector('.registration_number')
var btnAdd = document.querySelector(".btnAdd")
const dropdownSlected = document.querySelector("select");
let createDiv = ''
let createSpan = ''
if (localStorage['user-registration']) {
    var storeRegistrations = localStorage['user-registration']
}
var factory_instance = FactoryRegistration()

btnAdd.addEventListener('click', function () {
    var user_registration = user_registrationElem.value.trim()
    const selectedChoice = dropdownSlected.value;

    if (user_registration !== '') {
        var x = factory_instance.addRegistrations(user_registration)
        localStorage['user-registration'] = factory_instance.getRegistrations()
        createDiv = document.createElement('div')
        createSpan = document.createElement('SPAN')
        createSpan.textContent = user_registration
        createDiv.appendChild(createSpan)
        document.body.appendChild(createDiv)
        createDiv.classList.add('displayReg')

        // console.log(selectedChoice);
        // regItem.textContent = ();
        // reg_div.appendChild(regItem)
        // document.body.appendChild(reg_div)
        // reg_div.classList.add('displayReg')
    }
})
dropdownSlected.addEventListener('change', (event) => {
        document.body.removeChild(createDiv)

    const {
        value,
    } = event.target.options[event.target.selectedIndex]
    var x = factory_instance.selectTown(value)
    console.log(x)
    console.log(value);
    console.log(localStorage['user-registration']);
    createDiv = document.createElement('div')
    createSpan = document.createElement('SPAN')
    createSpan.textContent = x
    createDiv.appendChild(createSpan)
    document.body.appendChild(createDiv)
    createDiv.classList.add('displayReg')
})
