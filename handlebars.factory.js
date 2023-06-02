function RegistrationFactory(storeRegistrations) {
    var registration_list = storeRegistrations || []

    var selectedItem = []

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/
        return (regExpression.test(user_registration) === true) ? true : false

    }

    function addRegistrations(user_registration) {
        if (registration_list[user_registration] == undefined) {
            registration_list.push(user_registration)
            registration_list[user_registration] = 0
        }
    }

    function getRegistrations() {
        return registration_list
    }

    function selectTown(dropdown_value) {
        selectedItem = []
        for (var i = 0; i < registration_list.length; i++) {
            var firstTwoChars = registration_list[i].charAt(0) + registration_list[i].charAt(1)
            if (dropdown_value == firstTwoChars || dropdown_value == 'allTowns') {
                selectedItem.push(registration_list[i])
            }
        } return selectedItem
    }

    function isTownSelected() {
        return (selectedItem.length === 0) ? 'No available registration' : ''
    }

 

    function errors(reg) {
        let errorMessage;
        let sub = reg.substring(3);
        //  let parsedNto = parseInt(sub)
        let indicator = reg.charAt(1).toUpperCase()
        if (reg == '' || reg == null) {
            errorMessage = 'Please enter a vehicle registration'
            return errorMessage
        }
        if (reg.charAt(0).toLowerCase() !== 'c') {
            errorMessage = 'Registration must start with C'
            return errorMessage
        }
        if (['A', 'L', 'T', 'J'].includes(indicator) == false) {
            errorMessage = 'Registration must be from Cape Town(CA), Stellenbosch(CL), Ceres(CT) or Paarl(CJ)'
            return errorMessage
        }
        if (sub.length < 4) {
            errorMessage = 'Registration is too short.'
            return errorMessage
        }
        if (sub.length > 7) {
            errorMessage = 'Registration is too long.'
            return errorMessage
        }
        return ''
    }

    return {
        addRegistrations,
        getRegistrations,
        selectTown,
        isTownSelected,
        validRegistration,
        errors
    }

}
