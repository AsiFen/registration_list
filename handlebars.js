var user_registrationElement = document.querySelector('.reg_number1')
var btnAdd1 = document.querySelector(".addBtn")
var btnClear1 = document.querySelector('.clear')
var displayTemplate = document.querySelector('.container1')
var err_display = document.querySelector('.anerror')
var err_display2 = document.querySelector('.towny')
var templateReg = document.querySelector('.regTemplate').innerHTML
var templateFunction = Handlebars.compile(templateReg)
var displayTemplate = document.querySelector('.displayTemplate')
var dropdown = document.querySelector(".towns");

let create_div = ''
let create_span = ''
let errorTimeout1;
var useTemplate = ''
function registrationDisplay(registration) {
    // create_div = document.createElement('div')
    // create_span = document.createElement('span')
    // create_span.textContent = registration
    // create_div.appendChild(create_span)
    // displayTemplate.appendChild(create_div)
    // create_div.classList.add('displayReg')
}

function messageDisplay1(message, className) {
    if (message) {
        err_display.innerHTML = message
        err_display.style.padding = '5px'
        err_display.classList.add(className)
        err_display.classList.remove('hidden')
    } else {
        err_display.classList.add('hidden')
        err_display.style.padding = '0px'
    }
    clearTimeout(errorTimeout1);
    errorTimeout1 = setTimeout(() => {
        err_display.classList.add('hidden')
        err_display.style.padding = ''
        err_display.classList.remove(className)
        err_display.innerHTML = ''
    }, 3000)
}

function messageDisplay2(message, className) {
    if (message) {
    err_display2.innerHTML = message
    err_display2.style.padding = '15px'
    err_display2.classList.add(className)
    }
    clearTimeout(errorTimeout1);
    errorTimeout1 = setTimeout(() => {
        err_display2.classList.remove(className)
        err_display2.innerHTML = ''
        err_display2.style.padding = '0px'

    }, 2000)
}

var storeList = [];
var temp = {}



if (localStorage['user-reg']) {
    storeList = JSON.parse(localStorage['user-reg'])
}
var factoryFunction = RegistrationFactory(storeList)

btnAdd1.addEventListener('click', function () {
    // err_display.classList.remove('anerror')

    var user_reg = user_registrationElement.value.trim().toUpperCase()
    if (factoryFunction.errors(user_reg) == '') {
        var validReg = factoryFunction.validRegistration(user_reg)

        if (validReg) {
            factoryFunction.addRegistrations(user_reg)
            let getRegistrations = factoryFunction.getRegistrations()
            localStorage['user-reg'] = JSON.stringify(factoryFunction.getRegistrations())
            if (temp[getRegistrations] == undefined) {
                registrationDisplay(getRegistrations[getRegistrations.length - 1])
                temp[getRegistrations] = 1
            }
            else {
                messageDisplay1('Registration has already been added.', 'green')
            }
            useTemplate = templateFunction({ keepRegs: storeList })
            displayTemplate.innerHTML = useTemplate
        }
        user_registrationElement.value = ''
    }
    else {
        messageDisplay1(factoryFunction.errors(user_reg), 'error')
    }
})

user_registrationElement.addEventListener('input', (e) => {
    var regexEx = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/ // Example regex to allow only letters and spaces
    if (regexEx.test(e.target.value)) {
        err_display.classList.add('hidden')
        err_display.style.padding = '0px'
        err_display.innerHTML = ''
    } else {
        messageDisplay1(factoryFunction.errors(e.target.value), 'error')
    }

})


dropdown.addEventListener('change', (event) => {
    const { value } = event.target.options[event.target.selectedIndex]
    var townSelectedList = factoryFunction.selectTown(value)
    localStorage[value] = factoryFunction.selectTown(value)
    if (factoryFunction.isTownSelected() == '') {
        for (var i = 0; i < townSelectedList.length; i++) {
            localStorage[value] = townSelectedList[i]
            toDisplay = townSelectedList[i]
        }
        displayTemplate.innerHTML = 0

        console.log(useTemplate);
        useTemplate = templateFunction({ keepRegs: townSelectedList })
        console.log(useTemplate);
        displayTemplate.innerHTML = useTemplate
    }
    else {
        clearTimeout(errorTimeout1);    
            useTemplate.innerHTML = ''

        messageDisplay2(factoryFunction.isTownSelected(), 'error')
    }
})

// if (storeList) {
//     for (var i = 0; i < storeList.length; i++) {
//         registrationDisplay(storeList[i])
//     }
// }

btnClear1.addEventListener('click', function () {
    factoryFunction.clear();
    messageDisplay2('Reset successful!', 'green')

    setTimeout(() => {
        location.reload()

    }, 2100)
    // event.preventDefault();

    // create_div.innerHTML = ''
    // displayTemplate.innerHTML = ''
})

useTemplate = templateFunction({ keepRegs: storeList })
displayTemplate.innerHTML = useTemplate
document.addEventListener('DOMContentLoaded', () => {

})