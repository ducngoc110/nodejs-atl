
exports.index = (req, res, next) => {
	res.render('backend/home/index', { pageTitle: 'Dashboard', actionTab: 'home' });
}