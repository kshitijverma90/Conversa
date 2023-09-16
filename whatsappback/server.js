import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Pusher from 'pusher'
import cors from 'cors'
// import dbMessages from './dbMessages'
import Messages from "./dbMessages.js"
const app= express()
const port=process.env.PORT || 9000

app.use(bodyParser.json());

app.use(cors())

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// });

const pusher = new Pusher({
    appId: "1671641",
    key: "7334e3bb719435fada96",
    secret: "5508ef804558166d0216",
    cluster: "ap2",
    useTLS: true
  });


const connection_url='mongodb+srv://kshitij:yashverma@cluster0.sjyvcsl.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url).then(()=>console.log("connection successful")).catch((err)=>{
    console.log(err);
})

const db=mongoose.connection
db.once('open',()=>{
    console.log("DB CONNECTED");
    const msgCollection=db.collection('messagecontents');
    const changeStreeam=msgCollection.watch();

    changeStreeam.on('change',(change)=>{
        console.log('A change occured',change);

    if(change.operationType === 'insert'){
        const messageDetails=change.fullDocument;
        pusher.trigger('messages','inserted', 
        {   
            message:messageDetails.message,
            name: messageDetails.name,
            timestamp:messageDetails.timestamp,
            received:messageDetails.received,
        }
        );
    }
    
    else{
        console.log('Error triggering pusher')
    }
})

})

//app routes

app.get('/',(req,res)=>res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send(err)
        })
})

app.post('/messages/new',(req,res)=>{
    const data=req.body
    Messages.create((data))
        .then((data)=>{
            res.status(201).send(data)
        })
        .catch((err)=>{
            res.status(500).send(err)
        })
    // Messages.create(data)
    // .then((result) => {
    //    res.send(data)
    //  })
    //  .catch((err) => {
    //    res.send({ kq: 0, msg: 'kết nối DB thất bại' })
    // })
    
})


//listen
app.listen(port,()=>console.log('Listening on localhost: ${port}'));