const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const uri = "mongodb+srv://aitimis:Angular!2345.@cluster0.qzzyqmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.json());
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

    // --- EXPRESS REQUEST HANDLERS ---

    // Read all quotes
    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/index.html');
        quotesCollection.find().toArray()
        .then(result => {
            res.render('index.ejs', { quotes: result });
        })
        .catch(error => console.error(error))
    });

    // Create a new quote
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => { 
            res.redirect('/')
        })
        .catch(error => console.error(error));
    });

    // Update an existing quote
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote,
                },
            },
            {
                upsert: true,
            }
        )
        .then(result => {
            res.json('Success'); // Send a response back to the client
        })
        .catch(error => console.error(error));
    });

    // Delete a specific quote
    app.delete('/quotes', (req, res) => {
        quotesCollection
            .deleteOne(/* ... */)
            .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
            })
            .catch(error => console.error(error))
        })

    // Delete all quotes
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteMany({})
            .then(result => {
                console.log(`Deleted ${result.deletedCount} items`);
                res.json(`Deleted ${result.deletedCount} items`); // Send a response back to the client
            })
            .catch(error => console.error(error));
    });


    // start the server
    app.listen(3000, () => {
        console.log('listening on 3000');
    })

}).catch(error => console.error(error));

  




