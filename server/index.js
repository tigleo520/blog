const express = require('express')
const app = express()

app.set('secret', 'a2dwq12ffdsf8')

app.use(require('cors')())
app.use(express.json())

require('./plugins/db')(app)
require('./routers/admin')(app)
require('./routers/web')(app)
app.use('/uploads', express.static(__dirname + '/uploads'))

app.listen(3001, () => {
  console.log('http://localhost:3001/')
})