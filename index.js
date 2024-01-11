const express = require('express')
const cors = require('cors');
const app=express()
const port=5000
const mongoDB = require("./db")
const corsOption={
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOption));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

mongoDB();
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use(express.json())
app.use('/api/',require("./routes/createuser"));
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})