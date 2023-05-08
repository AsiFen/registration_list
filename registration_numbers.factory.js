function FactoryRegistration() {
    var registration_list = []
    var selectedItem = []
    function addRegistrations(user_registration) {
        registration_list.push(user_registration)
    }

    function getRegistrations() {
        return registration_list
    }

    function selectTown(dropdown_value) {
        selectedItem = []
        for (var i = 0; i < registration_list.length; i++) {
            var firstTwoChars = registration_list[i].charAt(0) + registration_list[i].charAt(1)
            let reg_indicator = registration_list[i].split(' ')
            if (dropdown_value == firstTwoChars) {
                selectedItem.push(registration_list[i])
            }
        }
        return selectedItem
    }

    return {
        addRegistrations,
        getRegistrations,
        selectTown
    }
}