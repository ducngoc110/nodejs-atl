var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
	email : String,
	password: String,
	name : String,
	status : String,
	roles : String,
	meta : {
		name : String,
		birthday : String,
		more : String,
		office : String,
		address: String,
		phone: String,
		facebook: String,
		google: String
	}
});

userSchema.methods.encryptPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);  
};

module.exports = mongoose.model('User', userSchema);