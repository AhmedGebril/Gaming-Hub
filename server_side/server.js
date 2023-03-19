const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const { connectToDb, getDb } = require('./DB')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require('multer')
const path = require('path')
const cookieParser = require('cookie-parser')
let db
let token

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


connectToDb((err) => {
    if (!err) {
    app.listen(3001, () => {
        console.log('Listening server on port 3001')
    })
    db = getDb()
    }
})


app.post('/register', (req, res) => {
    const {username,password,email} = req.body
    db.findOne({  
        $or: [
        { username },
        { email },
    ],
    })
    .then((data)=>{
        if(data){
            if(data.username == username){
                res.json('username  already registered')
            }else{
                res.json('email already taken')
            }
        }
        else{
            db.insertOne({
                username: username,
                password: password,
                email: email
            }).then(()=>{
                res.status(201)
            }).catch(err => {
                res.status(200).json(err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].description)
                
            })
        }
    })
})


app.post('/login', (req, res) => {
    const{Email,Password} = req.body
    db.findOne({email: Email,password:Password}).then((data)=>{
        let payload = {username:data.username}
        token = jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: '1h' })
        res.status(201).json({payload: payload,token: token})
    }).catch(err => {
        res.status(200).json(err)
    })
})

app.get('/AccountInfo',(req,res)=>{
    db.findOne({username:req.query.user}).then((data)=>{
        res.status(201).json({name:data.username,email:data.email,password:data.password})
    })
})

app.post('/updateInfo',(req,res)=>{
    const newData = req.body.newData
    const oldData = req.body.oldData
    db.updateOne({username:oldData},{$set:{username:newData.name,email:newData.email,password:newData.password}}).then((data)=>{
        res.status(201).json({username:newData.name,email:newData.email,password:newData.password})
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/Auth',(req,res)=>{
    const token = req.body.jwttoken
    try{
        const decodedToken= jwt.verify(token,process.env.SECRET_KEY)
        res.status(201).json({message:'logged in'})
    }catch(err){
        if (err.message === 'jwt expired') {
            res.status(200).json({message:'token expired'})
          } else {
            // The verification failed for some other reason
            res.status(500).json({err})
          }
    }
})



// implement the account image
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({ storage: storage })

// app.post('/upload',upload.single('image'),(req,res)=>{
//     console.log(req.file.path)
// })