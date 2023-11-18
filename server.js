const express = require('express')
const methodOverride = require('method-override')
const db = require('./config/connection')


const { engine } = require('express-handlebars')

const session = require('express-session')

const view_routes = require('./controllers/view_routes')
const user_routes = require('./controllers/user_routes')
const post_routes = require('./controllers/post_routes')


const PORT = process.env.PORT || 3001

const app = express()

app.use(express.static('./public'))

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use(session({
  secret: 'super secret string',
  resave: false,
  saveUninitialized: true
}))

app.use('/', [view_routes, post_routes])

app.use('/auth', user_routes)


db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Server is running on port', PORT))
  })