function FactoryRegistration(storeRegistrations) {
    var registration_list = storeRegistrations || []
    var selectedItem = []

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]?\d{3}[- ]?\d{1,4}$/
        if (regExpression.test(user_registration) === true) {
            console.log(user_registration);
            return user_registration
        }
    }

    
    function addRegistrations(user_registration) {
        var list = []
        var valid_reg = validRegistration(user_registration)
        if (list[valid_reg] === undefined) {
            registration_list.push(valid_reg)
            list[valid_reg] = 0
        }
    }


    function getRegistrations() {
        console.log(registration_list);
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

    return {
        addRegistrations,
        getRegistrations,
        selectTown,
        validRegistration,
        clear
    }
}