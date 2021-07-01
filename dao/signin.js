const db = require('../db/db');
const bcrypt = require('bcrypt');

class SignInDAO {

    async authenticateUser(UserDto) {

        const { emailId, password } = UserDto;
        return await getPassword(emailId)
            .then(data => comparePassword(password, data))
            .then(data => data)
            .catch(err => console.log("Error during authentication: " + err));

        async function getPassword(emailId) {

            const result = await db('users')
                .where({
                    email_id: emailId
                })
                .select('password', 'first_name');

            if (result.length > 0) {
                return ([result[0].password, result[0].first_name]);
            }
        }

        async function comparePassword(password, data) {

            return new Promise(function (resolve, reject) {
                bcrypt.compare(password, data[0], function (err, res) {
                    if (res) {
                        resolve(data[1]);
                    }
                    else {
                        reject(null);
                    }
                });
            });
        }
    }
}

module.exports = new SignInDAO();