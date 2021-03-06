require('dotenv').config()
const express = require('express')
const bodyparser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const Bootcamp = require('./models/bootcampModel')
const Week = require('./models/weekModel')
const User = require('./models/userModel')
const { sendMail } = require('./middleware/snedMail')
const app = express()
var cron = require('node-cron')
var cors = require('cors')
const PORT = process.env.PORT || process.env.SERVER_PORT
const myDb = require('./database/db')
myDb()

app.use(morgan('dev'))
app.use(express.json())

//include body-parser
app.use(bodyparser.urlencoded({ extended: true }))

/** static file **/
app.use(express.static(path.join(__dirname, 'public')))
//app.use(cors())
app.get('/', (req, res, nexet) => {
  res.send('Server Running...')
})

/* //schedule jobs
cron.schedule('* * * * *', async () => {
  const bootcamps = await Bootcamp.find()
  bootcamps.forEach((bootcamp) => {
    const start_date = bootcamp.start_date
    const current_date = new Date()

    const timePeriod = []

    for (let i = 0; i <= bootcamp.weeks; i++) {
      timePeriod.push(start_date.getTime() + 1000 * 60 * 60 * 24 * 7 * [i])
    }

    console.log(start_date, current_date)

    timePeriod.map(async (item, index) => {
      if (current_date.getTime() > item) {
        await Week.findOneAndUpdate(
          { name: `week${index + 1}` },
          { show: true }
        )
      }
    })

    //create empty answers for each student of this bootcamp for that quiz
    bootcamp.students.map(async (student) => {
      const user = await User.findOne(student._id)

      //send email to the mentor (submited Answer) .............>
      const toUser = { email: user.email, name: user.name }
      const subjet = 'Bootcamp content for this week is now opened'
      const html = {
        student: '',
        text:
          'We want to inform you that Bootcamp content for this week is now opened ',
        link: 'http://batch22server.ccab.tech/quiz/'
      }

      sendMail( toUser, subjet, html)
    })
  })
}) */

const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const answerRoutes = require('./routes/answerRoutes')
const bootcampRoutes = require('./routes/bootcampRoutes')
const dayRoutes = require('./routes/dayRoutes')
const weekRoutes = require('./routes/weekRoutes')
const quizAnswerRoutes = require('./routes/quizAnswerRoutes')
const quizRoutes = require('./routes/quizRoutes')
const orderRoutes = require('./routes/orderRoutes')

app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/answers', answerRoutes)
app.use('/api/bootcamp', bootcampRoutes)
app.use('/api/content', dayRoutes)
app.use('/api/weeks', weekRoutes)
app.use('/api/quizAnswer', quizAnswerRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/order', orderRoutes)

app.listen(PORT, () => {
  console.log('The server is running on port: ' + PORT)
})
