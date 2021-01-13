console.log('sample node app')


const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.listen(3000, () => console.log('listening on 3000'))



const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://username:password1234@cluster0.z4dn6.mongodb.net/<dbname>?retryWrites=true&w=majority'

MongoClient.connect(
    connectionString,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err)

        console.log('Connected to Database Server')
        const db = client.db('star-wars-quotes')
        const quotesCollections = db.collection('quotes')

        //middlewares
        app.use(bodyParser.urlencoded({
            extended: true
        }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.post('/quotes', (req, res) => {
            quotesCollections.insertOne(req.body)
                .then(result => { res.redirect('/') })
                .catch(err => console.error(err))
        })

        app.get('/', (req, res) => {
            //const getCollection = db.collection('quotes').find()
            db.collection('quotes').find().toArray()
                .then(result => { console.log(res.render('index.ejs', { quotes: result })) })
                .catch(err => { console.error(err) })
            //console.log(getCollection)


        })

        app.put('/quotes', (req, res) => {
            console.log(req.body)
            quotesCollections.findOneAndUpdate(
                {
                    name: 'Dark Vadar'
                },
                {
                    $set: {
                        name: req.body.name, quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => console.log(result))
                .catch(err => console.error(err))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollections.deleteOne(
                {
                    name: req.body.name
                }
            )
            .then(result => res.json(`Deleted Dark Vadar's quote`))
            .catch(err=> console.error(err))
        })
    })

    //this caused an error. check for mistake
// MongoClient.connect(connectionString, (err, client) => {​​​​ // ... do something here 
// if(err) return console.error(err)

// console.log('connected to db')
// }​​​​)

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/index.html')
// })









//app.get(endpoint,callback function)

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/index.html')
// })

