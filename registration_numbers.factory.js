function FactoryRegistration(storeRegistrations) {
    var registration_list = storeRegistrations || []

    var selectedItem = []

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/
        return (regExpression.test(user_registration) === true) ? true : false

    }

    function addRegistrations(user_registration) {
        if (registration_list[user_registration] == undefined) {
            registration_list.push(user_registration)
            registration_list[user_registration] = 1
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
        return (selectedItem.length === 0) ? 'No available registration': ''
        // {
        // }
        // else {
        //     return true
        //     // return 'There are '+ selectedItem.length+ ' registration(s).'
        // }
    }

    function clear() {
        if (confirm('Are you sure you want to clear all registrations?')) {
            localStorage.clear();
        }
    }

    function errors(reg) {
        let errorMessage;
        let sub = reg.substring(3);
      //  let parsedNto = parseInt(sub)
        let indicator = reg.charAt(1)

        if (reg == '' || reg == null) {
            errorMessage = 'Please enter a vehicle registration'
            return errorMessage
        }
        if (reg.charAt(0) !== 'C') {
            errorMessage = 'Registration must start be from Western Cape'
            return errorMessage
        }
        if (['A', 'L', 'T', 'J'].includes(indicator) == false) {
            errorMessage = 'Registration must start be from Cape Town, Bellvile, Ceres or Paarl'
            return errorMessage
        }
        if (sub.length < 4) {
            errorMessage = 'Must have more than 4 numerical digits'
            return errorMessage
        }
        if (sub.length > 7) {
            errorMessage = 'Must have less than 8 numerical digits'
            return errorMessage
        }
       
        if (validRegistration(reg) == false) {
            errorMessage = 'Enter valid registration. In this format CA 123 123'
            return errorMessage
        }

        else {
            return true
        }
    }


    return {
        addRegistrations,
        getRegistrations,
        selectTown,
        isTownSelected,
        validRegistration,
        clear,
        errors
    }

}
var factory_instance = FactoryRegistration(['CA 123 123'])
