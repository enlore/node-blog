var userProvider = require('../userProvider')
  , expectedUser = {
        username: 'enlore',
        id: 1,
        password: 'butts',
        byLine: 'N. E. Lorenson' 
    }

describe('the userProvider', function () {
    it("should return 'undefined' when there is no user by a given username", function () {
        expect(userProvider.getUser('no-guy-here')).toBe(undefined) 
    })

    it("should return a user object given a valid username", function () {
            expect(userProvider.getUser('enlore')).toEqual(expectedUser) 
    })
})
