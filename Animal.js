/* ANIMAL MODULE DEFINITION MODULE */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase');

var Schema = mongoose.Schema;

var animalSchema = new Schema({
	name: {type: String, required: true, unique: true},
	species: {type: String, required: true},
	breed: String,
	gender: {type: String, enum: ['male', 'female']},
	traits: [String],
	age: Number
});

// Exposing animalSchema as Animal
module.exports = mongoose.model('Animal', animalSchema);
