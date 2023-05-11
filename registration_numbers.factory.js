function FactoryRegistration(storeRegistrations) {
    var registration_list = storeRegistrations || []


    var selectedItem = []
    var list = {}

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]?\d{3}[- ]?\d{1,4}$/
        return (regExpression.test(user_registration) === true) ? true : false
        // if (regExpression.test(user_registration) === true) {
        //     return true
        // }
        // else {
        //     return "Inv registration format"
        // }
    }

    function addRegistrations(user_registration) {
        console.log(registration_list[user_registration]);
        if (registration_list[user_registration] == undefined) {
            registration_list.push(user_registration)
            registration_list[user_registration] = 1
        }
    }

    function getRegMap() {
        let regMap = Object.keys(list)
        // console.log(regMap)
        return regMap
    }
    function getRegistrations() {
        return registration_list
    }

    function selectTown(dropdown_value) {
        selectedItem = []
        for (var i = 0; i < registration_list.length; i++) {
            var firstTwoChars = registration_list[i].charAt(0) + registration_list[i].charAt(1)
            if (dropdown_value == firstTwoChars) {
                selectedItem.push(registration_list[i])
            }
            if (dropdown_value == 'allTowns') {
                selectedItem.push(registration_list[i])
            }
        }
        return selectedItem
    }

    function clear() {
        if (confirm('Are you sure you want to clear all registrations?')) {
            localStorage.clear();
        }
    }

    function errors(reg) {
        let sub = reg.substring(3);
        return (sub.length > 3 && sub.length < 9) ? true : false
    }
    return {
        addRegistrations,
        getRegistrations,
        selectTown,
        validRegistration,
        clear,
        errors,
        getRegMap
    }
}