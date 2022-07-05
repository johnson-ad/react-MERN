const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendsModel = require('./models/Friends');

mongoose.connect('mongodb://localhost:27017/learnMRN?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true });

app.listen(3001, () => {
    console.log('You are connected to port 3001');
});

/**
 * @description - This is a route that will be used to create a new friend in the database.
 * @param {GET} is the method that will be used to create a new friend in the database.
 * @param {async} on utilise la fonction async car on fait une requête asynchrone.
 */
app.get('/insert', async (req, res) => {
    // On crée un nouvel objet Friend avec la meme configuration de notre Schema FriendsSchema
    const friend = new FriendsModel({
        name: 'Jessyca',
        age: 20,
        description: 'She is beautiful'
    });
    await friend.save(); // pour enregistrer dans la base de données

    res.send("Inserted data")
});


/**
 * @description - This is a route that will be used to get all friends in the database.
 * @param {GET} is the method that will be used to get all friends in the database.
 */
app.get('/read', async (req, res) => {
    // On récupère tous les amis de la base de données et les affiches
    FriendsModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});



