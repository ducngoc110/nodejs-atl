var User     = require('../models/user');
var settings = require('../config/settings');

exports.get_add = (req, res, next) => {
	var errors = req.flash('error');
	res.render('backend/user/user-add', {
		pageTitle: 'Create user',
		errors ,
		hasErros : errors.length > 0,
		actionTab : 'user-add'
	});
}
exports.get_edit = (req, res, next) => {
	var id   = req.params.id;
	if (id) {
		var success = req.flash('success');
		var errors = req.flash('error');
		User.findOne({
			'_id' : id
		}, (err, user) => {
			if (err) {
				res.redirect('/user-manage');
			} else {
				if (user) {
					res.render('backend/user/user-add', {
						pageTitle : 'Edit user',
						errors,
						hasErros  : errors.length > 0,
						success ,
						hasSuccess: success.length > 0,
						user,
						actionTab : 'user-add'
					});
				}
			}
		});
	}
}

exports.post_add = (req, res, next) => {
	req.checkBody('email', 'Email address invalid, please check again.').isEmail();
	req.checkBody('password', 'Password invalid, password must be at least '+ settings.passwordLength +' characters or more.').isLength({min : settings.passwordLength});
	req.checkBody('password', 'Confirm password is not the same, please check again.').equals(req.body.password_cf);

	var errors = req.validationErrors();
	var id = req.body._id;
	if (errors) {
		var messages = [];
		errors.forEach((error) => {
			messages.push(error.msg);
		});
		req.flash('error', messages);
		if (!id) {
			res.redirect('/user-add');
		} else {
			res.redirect('/user-edit/'+ id);
		}
	} else {
		if (!id) {
			User.findOne({
				'email' : req.body.email
			}, (err, user) => {
				if (err) {
					req.flash('error', '404 Error, please again');
					res.redirect('/user-add');
				}
				if (user) {
					req.flash('error', 'Email address used, please enter another');
					res.redirect('/user-add');
				} else {
					var newUser = new User();
					newUser.email    = req.body.email;
					newUser.password = newUser.encryptPassword(req.body.password);
					newUser.status   = (req.body.status) ? req.body.status : 'off';
					newUser.roles    = req.body.roles;
					newUser.meta.name     = req.body.name;
					newUser.meta.avatar   = (req.file) ? req.file.filename : '';
					newUser.meta.birthday = req.body.birthday;
					newUser.meta.more     = req.body.more;
					newUser.meta.office   = req.body.office;
					newUser.meta.address  = req.body.address;
					newUser.meta.phone    = req.body.phone;
					newUser.meta.facebook = req.body.facebook;
					newUser.meta.google   = req.body.google;
					newUser.save((err, result) => {
						if (err) {
							req.flash('error', '404 Error, please again');
							res.redirect('/user-add');
						} else {
							req.flash('success', 'Created user successfully!');
							res.redirect('/user-edit/' + result._id);
						}
					});
				}
			});
		} else {
			User.findById(id,(err, user) => {
				if (err) {
					req.flash('error', '404 Error, please again');
					return res.redirect('/user-edit/'+ id);
				}
				user.email    = req.body.email;
				user.status   = (req.body.status) ? req.body.status : 'off';
				user.roles    = req.body.roles;
				user.meta.name     = req.body.name;
				user.meta.avatar   = (req.file) ? req.file.filename : '';
				user.meta.birthday = req.body.birthday;
				user.meta.more     = req.body.more;
				user.meta.office   = req.body.office;
				user.meta.address  = req.body.address;
				user.meta.phone    = req.body.phone;
				user.meta.facebook = req.body.facebook;
				user.meta.google   = req.body.google;
				if (req.body.password !== user.password) {
					user.password = user.encryptPassword(req.body.password);
				}
				console.log(user);
				user.save();
				req.flash('success', 'Updated user successfully!');
				res.redirect('/user-edit/' + id);
			});
		}
	}
}

exports.get_manage = (req, res, next) => {
	User.find(function(err, users){
		res.render('backend/user/user-manage', {
			pageTitle: 'Management user',
			actionTab : 'user-manage',
			users
		});
	});
}

exports.post_manage_filter = (req, res, next) => {
	let role = req.body.role;
	let input = req.body.input;
	let data = {};
	if (role) {
		data = { roles : role }
	} else if (input) {
		input = new RegExp(input, "i");
		data = { email : input }
	}
	User.find(data, (err, users) => {
		if (users) {
			res.render('backend/user/user-manage-js',
				{ layout: false, users },
				(err, html) => res.json(html)
			);
		}
	});
}

exports.post_manage_remove = (req, res, next) => {
	let status = true,
	id = req.body.id;
	User.findByIdAndRemove(id, (err) => {
		if (err) { status = false; }
		let data = { status };
		res.json(data);
	});
}