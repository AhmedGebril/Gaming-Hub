const {MongoClient} = require('mongodb')
let DbConnection 

module.exports ={
    connectToDb:(cb)=>{
        MongoClient.connect('mongodb://127.0.0.1:27017/Gaming-hub')
        .then((client)=>{
            console.log('Connected to database')
            DbConnection = client.db()
            return cb()
        })
        .catch((err)=>{
            console.log(err)
            return cb(err)
        })
    },
    getDb:()=> DbConnection.collection('users')
}