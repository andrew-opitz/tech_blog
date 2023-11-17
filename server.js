const express = require('express')
const db = require('./config/connection')

const routes = require('./controllers/api/index')
const view_routes = require('./controllers/view_routes/index')
const { engine } = require('express-handlebars')

const session = require('express-session')


const PORT = process.env.PORT || 3333

const app = express()

app.use(express.static('./public'))

app.use(express.urlencoded({ extended: false }))

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

app.use('/api', routes)
app.use('/', view_routes)


db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Server is running on port', PORT));
  });