var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET users add. */
router.get('/user-add', user_controller.get_add);

/* POST users add. */
router.post('/user-add', user_controller.post_add);


module.exports = router;
