const express = require('express')
const session = require('express-session')
const app = express()
const {User, Contact} = require('./lib/models')
const db = require("./db")

app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))
app.use(session({secret: "wlif8ow8ysdfuhs8", resave: false, saveUninitialized: true}))

const middleware = (req, res, next) => {
    if (!req.session.userId) return res.redirect("/")

    const ownRoute = req.session.userId === Number(req.params.id)

    ownRoute ? next() : res.redirect(`/users/${req.session.userId}`)
}

db.sync().then(() => {
    app.get("/", (req, res) => {
        
        User.findAll().then(users => {
            res.render('index', {users})
        })
    })

    app.post("/users", (req, res) => {
        User.findOrCreate({where: req.body}).then(result => {
            const [user] = result
            user.getContacts().then(contacts => {
                req.session.userId = user.id
                res.render('home', {user, contacts})
            })
        })
    })

    app.get("/users/:id", middleware, (req, res) => {
        User.findByPk(req.params.id).then(user => {
            user.getContacts().then(contacts => {
                res.render('home', {user, contacts})
            })
        })
    })

    app.post("/users/:id/contacts", middleware, (req, res) => {
        User.findByPk(req.params.id).then(user => {
            Contact.create(req.body).then(contact => {
                user.addContact(contact).then(() => {
                    user.getContacts().then(contacts => {
                        res.render('home', {user, contacts})
                    })
                })
            })
        })
    })
    
    app.listen(9292)
})
