const express = require('express'); /*import d'express*/
const mongoose = require("mongoose") //import du mongoose
const dotenv = require('dotenv'); /*pour importer .env*/
const cors = require('cors');
const categorieRouter = require('./routes/categorie.route')
const scategorieRouter = require('./routes/scategorie.route')
const articleRouter = require('./routes/article.route')
const paymentRouter = require( "./routes/payment.route")
const userRouter= require("./routes/user.route")

dotenv.config()
const app = express();

//BodyParser Middleware
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD, { //accede au datatbase dans .env
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie"); //.then ne
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("fatma hello!!!!!");
});
app.use("/api/categories", categorieRouter) //bech n9olo 3a route eli bech yhel biha categorie
app.use("/api/scategories", scategorieRouter)
app.use("/api/articles", articleRouter)
app.use('/api/payment', paymentRouter);
//authentification backend 
app.use('/api/user',userRouter);
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

 
module.exports =app;