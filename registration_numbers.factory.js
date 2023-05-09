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

    function addRegistrations() {
        var list = []
        var user_registration = validRegistration()
        if (list[user_registration] === undefined) {
            registration_list.push(user_registration)
            list[user_registration] = 0
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

    return {
        addRegistrations,
        getRegistrations,
        selectTown,
        validRegistration
    }
}