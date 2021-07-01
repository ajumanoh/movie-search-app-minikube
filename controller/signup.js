const signUpService = require('../service/signup');

class SignUpController {

    signUp(req, res) {

        let { firstName, lastName, emailId, password, confirmPassword } = req.body;
        let values = { firstName, lastName, emailId, password };
        let errors = [];

        signUpService.getUserInfo(emailId)
            .then(data => checkIfPresent(data))
            .then(checkIfPasswordMatch)
            .then(addUserinfo)
            .catch(err => res.status(202).json("Error Signing up the user: " + err));

        function checkIfPresent(data) {
            if (data) {
                errors.push({ message: "You have already signed up. Try Signing In" });
                return res.render("signup", { errors });
            }
        }

        function checkIfPasswordMatch() {
            if (password != confirmPassword) {
                errors.push({ message: "Passwords do not match" });
                return res.render("signup", { errors });
            }
        }

        function addUserinfo() {
            if (errors.length === 0 && emailId != null) {
                signUpService.createUser(values)
                    .then(data => routeToSignIn(data))
                    .catch(err => res.status(202).json("Oops... Error Signing you up. " + err + ". Please try again later"));
            }
        }

        function routeToSignIn(data) {
            let message = "Thank you for Signing Up " + data + ". Please log in using your email id and password";
            res.render("signin", { message });
        }

    }
}

module.exports = new SignUpController();