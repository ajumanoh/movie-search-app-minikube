const db = require('../db/db');

class DashboardDAO {
    async readUserInfo(emailId) {
        const firstName = await db('users')
            .where({
                email_id: emailId
            })
            .select('first_name');
        return firstName;
    }
}

module.exports = new DashboardDAO();