var express = require('express');
var router  = express.Router();

var user_controller = require('../controllers/userController');

/* GET users add. */
router.get('/user-add', user_controller.get_add);
/* GET users edit. */
router.get('/user-edit/:id', user_controller.get_edit);

/* POST users add. */
router.post('/user-add', user_controller.post_add);


/* GET users manage. */
router.get('/user-manage', user_controller.get_manage);
router.get('/user-manage-filter', user_controller.get_manage_filter);

module.exports = router;
