var settings = require('../config/settings');

exports.get_add = (req, res, next) => {
	res.render('backend/user/add', { pageTitle: 'Create user' });
}

exports.post_add = (req, res, next) => {
	req.checkBody('email', 'Email address invalid, please check again.').isEmail();
	req.checkBody('password', 'Password invalid, password must be at least '+ settings.passwordLength +' characters or more.').isLength({min : settings.passwordLength});
	req.checkBody('password', 'Confirm password is not the same, please check again.').equals(req.body.password_cf);

	var errors = req.validationErrors();
	if (errors) {
		var messages = [];
		errors.forEach((error) => {
			messages.push(error.msg);
		});
	}
	console.log(messages);
	console.log(req.body.email);
}