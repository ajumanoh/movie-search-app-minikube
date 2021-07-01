const signUpDAO = require('../dao/signup')

class SignUpService {
    createUser(UserDto) {
        return signUpDAO.createUser(UserDto);
    }
    getUserInfo(emailId) {
        return signUpDAO.getUserInfo(emailId);
    }
}

module.exports = new SignUpService();