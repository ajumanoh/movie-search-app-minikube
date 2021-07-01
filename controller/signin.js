const signInService = require('../service/signin');

class SignInController {
    async signIn(req, res) {
        try {
            await signInService.authenticateUser(req.body)  // Authentication service would return first name if authenticated
                .then(firstName => checkUserInfo(firstName))
                .catch(err => res.status(202).json("Technical Error: " + err));

            function checkUserInfo(firstName) {
                if (firstName) {
                    res.render('dashboard', { user: firstName });
                }
                else {
                    let message = "Incorrect Username or Password. Please try again";
                    res.render("signin", { message });
                }
            }
        }
        catch (err) {
            res.status(202).json("Technical Error: " + err);
        }
    }
}

module.exports = new SignInController();
