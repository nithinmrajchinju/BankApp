const express = require('express')
const session = require('express-session')
const dataService = require('./service/dataservice')
const app = express()

app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))

// app.use((req, res, next) => {
//     console.log("application middleware");
//     next()
// })

const authMiddleWare = (req, res, next) => {
    if (!req.session.currentAcc) {
        res.json({
            statusCode: 422,
            status: false,
            message: "pls login"
        })
    }
    else {
        next()
    }
}

app.use(express.json())
app.get('/', (req, res) => {
    res.send("GET METHOD")
})

app.post('/', (req, res) => {
    res.send("POST METHOD")
})

app.post('/register', (req, res) => {
    dataService.register(req.body.acno, req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/login', (req, res) => {
    dataService.login(req, req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/deposit', authMiddleWare, (req, res) => {
    dataService.deposit(req.body.acno, req.body.pswd, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/withdraw', authMiddleWare, (req, res) => {
    dataService.withdraw(req, req.body.acno, req.body.pswd, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getTransaction', authMiddleWare, (req, res) => {
    dataService.getTransaction(req)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.listen(3000, () => {
    console.log("server started listing at port number:3000");
})