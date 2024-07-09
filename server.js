const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qzzyqmo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        // Route to delete "Darth Vader" quotes
        app.delete('/quotes/darth-vader', (req, res) => {
            quotesCollection.deleteMany({ name: 'Darth Vader' })
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete');
                    }
                    res.json(`Deleted ${result.deletedCount} Darth Vader quotes`);
                })
                .catch(error => console.error(error));
        });

        // Route to delete all quotes
        app.delete('/quotes', (req, res) => {
            console.log('Received request to delete all quotes');
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

  




