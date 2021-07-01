const dashboardService = require('../service/dashboard');

class DashboardController {
    async dashboard(req, res) {
        try {
            const firstName = await dashboardService.readUserInfo(req.body);
            res.status(201).json(firstName);
        }
        catch (err) {
            res.status(202).json("Technical Error: " + err);
        }
    }
}

module.exports = new DashboardController();