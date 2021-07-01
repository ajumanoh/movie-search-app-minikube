const dashboardDAO = require('../dao/dashboard');

class DashboardService {
    readUserInfo(UserDto) {
        const { emailId, password } = UserDto;
        return dashboardDAO.readUserInfo(emailId);
    }

}

module.exports = new DashboardService();