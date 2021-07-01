const signInDAO = require('../dao/signin')

class SignInService {
    async authenticateUser(UserDto) {
        return await signInDAO.authenticateUser(UserDto);
    }
}

module.exports = new SignInService();