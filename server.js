const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = "mongodb+srv://aitimis:Angular!2345.@cluster0.qzzyqmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    // express request handlers
    // we handle a GET request with the get method
    // app.get(endpoint, callback);
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    });

    app.post('/quotes', (req, res) => {
        console.log(req.body)
    })

    // start the server
    app.listen(3000, () => {
        console.log('listening on 3000');
    })
    
})
.catch(error => console.error(error));

  




