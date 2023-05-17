describe('Registration List Function', () => {

    describe('returns error messages', () => {
        it('should return registration is short', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            assert.equal('Registration is too short.', factory_instance.errors('CJ 123'))
        })
        it('should return registration is long', () => {
            var factory_instance = FactoryRegistration(['CA 123 123'])
            assert.equal('Registration is too long.', factory_instance.errors('CJ 12345678'))

        })
        it('should return registration indicator is invalid', () => {
            var factory_instance = FactoryRegistration()
            assert.equal('Registration must be from Cape Town(CA), Stellenbosch(CL), Ceres(CT) or Paarl(CJ)', factory_instance.errors('CK 123 456'))
        })
        it('should return registration string must be from WC', () => {
            var factory_instance = FactoryRegistration()
            assert.equal('Registration must start with C', factory_instance.errors('EC 2023'))
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

        it('return 2 registrations from Paarl', () => {
            var factory_instance = FactoryRegistration(['CJ 1234'])
            factory_instance.addRegistrations('CJ 4444')
            factory_instance.addRegistrations('CA 123 456')
            factory_instance.addRegistrations('CL 31314')
            factory_instance.getRegistrations()
            assert.deepEqual(['CJ 1234', 'CJ 4444'], factory_instance.selectTown('CJ'))
        })

        it('return 1 registration from Ceres', () => {
            var factory_instance = FactoryRegistration(['CT 654 321'])
            factory_instance.addRegistrations('CA 1234')
            factory_instance.addRegistrations('CA 123 456')
            factory_instance.addRegistrations('CL 31314')
            factory_instance.getRegistrations()
            assert.deepEqual(['CT 654 321'], factory_instance.selectTown('CT'))
        })

        it('return no registration from selected town', () => {
            var factory_instance = FactoryRegistration(['CA 123-123'])
            factory_instance.addRegistrations('CA 1234')
            factory_instance.addRegistrations('CA 123 456')
            factory_instance.addRegistrations('CL 31314')
            factory_instance.getRegistrations()
            factory_instance.selectTown('CT')
            assert.equal('No available registration', factory_instance.isTownSelected())
        })
    })

})