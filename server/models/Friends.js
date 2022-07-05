const mongoose = require('mongoose');


/**
 * @param {Schema} represent the schema of the model in mongoDB
 */
const FriendsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

/**
 * @description - This is a model that will be used to create a collection in the database.
 * @param {friends} is the name of your collection you are creating
 * @param {FriendsSchema} Represente the Schema.
 */
const FriendsModel = mongoose.model('friends', FriendsSchema);


module.exports = FriendsModel;