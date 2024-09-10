const bcrypt = require('bcryptjs')

const hashPass = (pass) => {
    const salt = bcrypt.genSaltSync(5)
    return bcrypt.hashSync(pass, salt)
}

const comparePass = (pass, hashedPass) => {
    return bcrypt.compareSync(pass, hashedPass)
}

module.exports = {hashPass, comparePass}