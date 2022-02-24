require('dotenv').config()
const db = require('./config/config')
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const cors = require('cors')

const path = require('path')
const { errorHandler } = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT

// middlewares
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cors())

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// method override
app.use(methodOverride('_method'))

// handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

// db connection
db()

// routes
// app.use('/', require('./routes/pageRoutes'))

// api routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`server started at port ${port}`))
