describe('', () => {
    it('', () => {
        var factory_instance = FactoryRegistration()
        factory_instance.addRegistrations('CA 1123')
        factory_instance.addRegistrations('CJ 123')
        factory_instance.addRegistrations('CL 123')
        factory_instance.getRegistrations()
        var x = factory_instance.selectTown('CL')

        assert.equal('', x)
    })
    it('', () => {
        var factory_instance = FactoryRegistration()
        factory_instance.addRegistrations('CA 1123')
        factory_instance.addRegistrations('CJ 123')
        factory_instance.addRegistrations('CL 123')
        factory_instance.getRegistrations()
        var x = factory_instance.selectTown('CL')

        assert.equal('', x)
    })
    it('', () => {
        var factory_instance = FactoryRegistration()
        factory_instance.addRegistrations('CA 1123')
        factory_instance.addRegistrations('CJ 123')
        factory_instance.addRegistrations('CL 123')
        factory_instance.getRegistrations()
        var x = factory_instance.selectTown('CL')

        assert.equal('', x)
    })
})
