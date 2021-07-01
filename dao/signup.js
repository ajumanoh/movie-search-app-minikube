const db = require('../db/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class SignUpDAO {

    async createUser(UserDto) {
        let { firstName, lastName, emailId, password } = UserDto;

        bcrypt.hash(password, saltRounds, (err, hash) => insertUserInfo(firstName, lastName, emailId, hash));

        async function insertUserInfo(firstName, lastName, emailId, hashpassword) {
            console.log(hashpassword);
            let firstNameInDB = await db('users')
                .insert({
                    first_name: firstName,
                    last_name: lastName,
                    email_id: emailId,
                    password: hashpassword
                })
                .returning('first_name');
            return firstNameInDB;
        }
    }

    async getUserInfo(emailId) {
        let firstNameInDB = await db('users')
            .where({
                email_id: emailId
            })
            .select('first_name');

        if (firstNameInDB.length > 0) {
            return firstNameInDB[0].first_name;
        }
        else {
            return null;
        }
    }
}

module.exports = new SignUpDAO();