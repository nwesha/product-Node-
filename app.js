const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

let products = [];

app.get('/', (req, res) => {
    res.render('index', { products: products });
});

app.post('/add-product', (req, res) => {
    const { name, price} = req.body;
    if (name && price) {
        products.push({ name, price });
    }
    res.redirect('/');
});

app.use((req, res, next) => {
    res.status(404).render('error');
});

app.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
