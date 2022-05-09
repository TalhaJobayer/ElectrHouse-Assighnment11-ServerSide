const express = require('express');
const { use } = require('express/lib/router');
const cors=require('cors')
app=express()
port=process.env.PORT ||5000


// middle ware===
 app.use(cors())
 app.use(express.json())
// middle ware===

app.get('/', (req, res) => {
    res.send('server is on the way to serve me')
  })
  
  app.listen(port, () => {
    console.log(`server is running ${port}`)
  })