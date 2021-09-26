/* TOY MODEL DEFINITION MODULE */

var mongoose = require('mongoose');

var mongoHostname = process.env.MONGO_HOSTNAME || 'localhost';
mongoose.connect(`mongodb://root:example@${mongoHostname}:27017/myDatabase?authSource=admin`);

var Schema = mongoose.Schema;

var toySchema = new Schema({
	id: {type: String, required: true, unique: true},
	name: {type: String, required: true},
	price: Number
});

// Exposing toySchema as Toy
module.exports = mongoose.model('Toy', toySchema);
