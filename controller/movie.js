const movieService = require('../service/movie');

class MovieController {
    async apiKey(req, res) {
        try {
            const apiKey = movieService.readApiKey();
            res.json({ apiKey: apiKey })
        }
        catch (err) {
            res.status(202).json("Technical Error in fetching api key " + err);
        }
    }
}

module.exports = new MovieController();