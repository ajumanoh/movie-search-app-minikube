const apiDAO = require('../dao/movie');

class MovieService {
    readApiKey() {
        return apiDAO.readApiKey();
    }
}

module.exports = new MovieService();