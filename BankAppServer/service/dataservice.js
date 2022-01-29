const db = require('./db')
users = {
    1000: { acno: 1000, username: "nithin", password: "nithin123", balance: 1000, transaction: [] },
    1001: { acno: 1001, username: "chinju", password: "chinju123", balance: 1500, transaction: [] },
    1002: { acno: 1002, username: "alan", password: "alan123", balance: 500, transaction: [] },
    1003: { acno: 1003, username: "amal", password: "amal123", balance: 2000, transaction: [] }
}
const register = (acno, username, password) => {
    return db.User.findOne({ acno })
        .then(user => {
            if (user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "user exists... pls login"
                }
            }
            else {
                const newUser = new db.User({
                    acno,
                    username,
                    password,
                    balance: 0,
                    transaction: []
                })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "user successfully created "
                }
            }
        })
    // if (acno in users) {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "user exists... pls login"
    //     }
    // }
    // else {
    //     users[acno] = {
    //         acno,
    //         username,
    //         password,
    //         balance: 0,
    //         transaction: []
    //     }
    //     return {
    //         statusCode: 200,
    //         status: true,
    //         message: "user successfully created "
    //     }
    // }

}

const login = (req, acno, pswd) => {
    console.log(pswd);
    return db.User.findOne({
        acno,
        password: pswd
    })
        .then(user => {
            if (user) {
                console.log(pswd);
                req.session.currentAcc = user.acno
                return {
                    statusCode: 200,
                    status: true,
                    message: "login successfully"
                }
            }
            return {
                statusCode: 422,
                status: false,
                message: "invalid user"
            }
        })
    // console.log(users);
    // if (acno in users) {
    //     if (pswd == users[acno]["password"]) {
    //         currentUser = users[acno]["username"]
    //         req.session.currentAcc = acno
    //         return {
    //             statusCode: 200,
    //             status: true,
    //             message: "login successfully"
    //         }
    //     }
    //     else {
    //         return {
    //             statusCode: 422,
    //             status: false,
    //             message: "invalid password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "invalid account number"
    //     }
    // }
}

const deposit = (acno, pswd, amount) => {
    var amt = parseInt(amount)
    return db.User.findOne({
        acno,
        password: pswd
    })
        .then(user => {
            if (!user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "invalid user"
                }
            }
            user.balance += amt
            user.transaction.push({
                amount: amt,
                type: "CREDIT"
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: amt + " Successfully deposited new balance is " + user.balance
            }
        })
    // var amt = parseInt(amount)
    // if (acno in users) {
    //     if (pswd == users[acno]["password"]) {
    //         users[acno]["balance"] += amt
    //         users[acno].transaction.push({
    //             amount: amt,
    //             type: "CREDIT"
    //         })
    //         console.log(users[acno].transaction, " aval bal " + users[acno]["balance"]);
    //         return {
    //             statusCode: 200,
    //             status: true,
    //             message: amt + " Successfully deposited new balance is " + users[acno]["balance"]
    //         }
    //     }
    //     else {
    //         return {
    //             statusCode: 422,
    //             status: false,
    //             message: "invalid password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "invalid account number"
    //     }
    // }
}

const withdraw = (req, acno, pswd, amount) => {
    var amt = parseInt(amount)
    return db.User.findOne({
        acno,
        password: pswd
    }).then(user => {
        if (!req.session.currentAcc == user) {
            return {
                statusCode: 422,
                status: false,
                message: "invalid user"
            }
        } if (user.balance < amt) {
            return {
                statusCode: 422,
                status: false,
                message: "insufficient balance"
            }
        }
        else {
            user.balance -= amt
            user.transaction.push({
                amount: amt,
                type: "DEBITE"
            })
            user.save()
            return {
                statusCode: 200,
                status: true,
                message: amt + " Successfully withdraw new balance is " + user.balance
            }
        }
    })
    // if (acno in users) {
    //     if (pswd == users[acno]["password"]) {
    //         users[acno]["balance"] -= amt
    //         users[acno].transaction.push({
    //             amount: amt,
    //             type: "DEBITE"
    //         })
    //         console.log(users[acno].transaction, " aval bal " + users[acno]["balance"]);
    //         return {
    //             statusCode: 200,
    //             status: true,
    //             message: amt + " Successfully withdraw new balance is " + users[acno]["balance"]
    //         }
    //     }
    //     else {
    //         return {
    //             statusCode: 422,
    //             status: false,
    //             message: "invalid password"
    //         }
    //     }
    // }
    // else {
    //     return {
    //         statusCode: 422,
    //         status: false,
    //         message: "invalid account number"
    //     }
    // }
}

const getTransaction = (req) => {
    return db.User.findOne({
        acno: req.session.currentAcc
    }).then(user => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                transaction: user.transaction
            }
        }
    })
    // return {
    //     statusCode: 200,
    //     status: true,
    //     transaction: users[req.session.currentAcc].transaction
    // }
}

module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}