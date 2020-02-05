/* TOY MODEL DEFINITION MODULE */

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase');

var Schema = mongoose.Schema;

var toySchema = new Schema({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	price: Number
});

// Exposing toySchema as Toy
module.exports = mongoose.model('Toy', toySchema);
