describe('Registration List Function', () => {

    describe('returns error messages', () => {
        it('should return registration is short', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            assert.equal('Must have more than 4 numerical digits', factory_instance.errors('CJ 123'))
        })
        it('should return registration is long', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            assert.equal('Must have less than 8 numerical digits', factory_instance.errors('CJ 12345678'))

        })
        it('should return registration indicator is invalid', () => {
            var factory_instance = FactoryRegistration()
            assert.equal('Registration must start be from Cape Town, Bellvile, Ceres or Paarl', factory_instance.errors('CK 123 456'))
        })
        it('should return registration string must be from WC', () => {
            var factory_instance = FactoryRegistration()
            assert.equal('Registration must start be from Western Cape', factory_instance.errors('EC 2023'))
        })
        it('should return registration string is empty', () => {
            var factory_instance = FactoryRegistration()
            assert.equal('Please enter a vehicle registration', factory_instance.errors(''))
        })

    })

    describe('returns all registrations from selected town', () => {
        it('return 3 registrations from Cape Town', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            factory_instance.addRegistrations('CA 1234')
            factory_instance.addRegistrations('CA 123 456')
            factory_instance.addRegistrations('CL 31314')
            factory_instance.getRegistrations()
            assert.deepEqual(['CA 123 123', 'CA 1234', 'CA 123 456'], factory_instance.selectTown('CA'))
        })

        it('return 1 registration from Stellenbosch', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            factory_instance.addRegistrations('CA 1234')
            factory_instance.addRegistrations('CA 123 456')
            factory_instance.addRegistrations('CL 31314')
            factory_instance.getRegistrations()
            factory_instance.selectTown('CL')
            assert.deepEqual(['CL 31314'], factory_instance.selectTown('CL'))
        })

        it('return no registration from selected town', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            factory_instance.addRegistrations('CA 1234')
            factory_instance.addRegistrations('CA 123 456')
            factory_instance.addRegistrations('CL 31314')
            factory_instance.getRegistrations()
            factory_instance.selectTown('CT')
            assert.equal('No availabe registration', factory_instance.isTownSelected())
        })
    })
})