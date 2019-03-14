var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	email : String,
	password: String,
	name : String,
	status : String,
	roles : String,
	meta : {
		name : String,
		birthday : String,
		description : String,
		office : String,
		address: String,
		phone: String,
		facebook: String,
		google: String
	}
});

module.exports = mongoose.model('User', userSchema);