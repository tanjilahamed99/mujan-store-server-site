const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 5000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {

    res.send('hello this is backend')

})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})