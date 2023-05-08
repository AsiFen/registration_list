function FactoryRegistration(storeRegistrations) {
    var registration_list = storeRegistrations || []
    console.log(registration_list);
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
            if (dropdown_value == firstTwoChars) {
                selectedItem.push(registration_list[i])
            }
            if(dropdown_value ==  'allTowns'){
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