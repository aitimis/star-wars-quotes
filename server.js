const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = "mongodb+srv://aitimis:Angular!2345.@cluster0.qzzyqmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
.then(client => {
    console.log("Connected to Database");

    const db = client.db('star-wars-quotes');
    
    const quotesCollection = db.collection('quotes');

    // express request handlers
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');

        const cursor = db.collection('quotes')
        .find()
        .toArray()
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    });

    app.post('/quotes', (req, res) => {
        // console.log(req.body)
        quotesCollection
        .insertOne(req.body)
        .then(result => { 
            console.log(result)
            res.redirect('/')
        })
        .catch(error => console.error(error));
    })

    // start the server
    app.listen(3000, () => {
        console.log('listening on 3000');
    })

}).catch(error => console.error(error));

  




