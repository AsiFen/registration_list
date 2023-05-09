function FactoryRegistration(storeRegistrations) {
    var registration_list = storeRegistrations || []
    var selectedItem = []
    var list = {}

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]?\d{3}[- ]?\d{1,4}$/
        if (regExpression.test(user_registration) === true) {
            return user_registration
        }
    }

    function addRegistrations(user_registration1) {
        var valid_reg = validRegistration(user_registration1)
        if (list[valid_reg] == undefined) {
            registration_list.push(valid_reg)
            list[valid_reg] = 1
        }
        
    }

    function getRegMap() {
        let regMap = Object.keys(list)
        console.log(regMap)
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
        if (confirm('Are you sure you want to clear all registraations?')) {
            localStorage.clear();
        }
    }

    function errors() {

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