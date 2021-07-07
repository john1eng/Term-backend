const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const termsRoutes = require('./terms-routes/termsRoutes');
const {corsFilter} = require('./middleware/cors-filter');

const app = express();

const allowedOrigins = '*';

const options = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.POT || 4000;

app.use('/term', termsRoutes);

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occured!' });
})

mongoose
    .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster.9a0q2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(()=> {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.log(err);
    });
