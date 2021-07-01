const dotenv = require('dotenv');
dotenv.config();

class ApiDAO {
    readApiKey() {
        return process.env.API_KEY;
    }
}

module.exports = new ApiDAO();