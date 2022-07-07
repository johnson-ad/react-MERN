const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendsModel = require('./models/Friends');

// Connect to MongoDB at your frontend
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/learnMRN?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true });

app.listen(3001, () => {
    console.log('You are connected to port 3001');
});

/**
 * @description - This is a route that will be used to create a new friend in the database.
 * @param {GET} is the method that will be used to create a new friend in the database.
 * @param {async} on utilise la fonction async car on fait une requête asynchrone.
 */
app.post('/addfriend', async (req, res) => {
    // On recuprer les data depuis le frontend (req.body) NB: body c'est le dieux param de notre Axios.post()
    const name = req.body.name;
    const age = req.body.age;

    //On crée un nouvel objet Friend avec la meme configuration de notre Schema FriendsSchema
    const friend = new FriendsModel({ name: name, age: age });
    await friend.save(); // pour enregistrer dans la base de données
    res.send(friend); //pour eviter les problems de copie d'object dans le frontend
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


app.put('/update', async (req, res) => {

    const newAge = req.body.newAge;
    const id = req.body.id;

    try {
        await FriendsModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge);
            friendToUpdate.save();
        })
    } catch (err) {
        console.log(err)
    }
    res.send("You are connected");

});


app.delete('/delete/:id', async (req, res) => {
    // ici on utilise params et non body
    const id = req.params.id;
    try {
        /**
         * @description - This is a route that will be used to delete a friend in the database.
         * @param {DELETE} is the method that will be used to delete a friend in the database.
         * @param {REMOVE} is the method that will be used to delete a friend in the database.
         */
        await FriendsModel.findByIdAndRemove(id).exec();
    } catch (err) {
        console.log(err)
    }
    res.send("Item is deleted");
});
