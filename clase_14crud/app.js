
const express = require('express'); 
const morgan = require('morgan'); 
const hbs = require('hbs'); 
const path = require('path'); 

const app = express(); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views')); 

hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {
    if (err) console.log(err); 
}); 

const productosRouter = require('./routes/productosRouter'); 

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/product', productosRouter);

app.use((req, res) => {
    console.log(`Ruta no encontrada: ${req.url}`);
    res.status(404).send('<h1>404 - Página no encontrada</h1>');
});

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('<h1>500 - Error interno del servidor</h1>');
});


module.exports = app;
