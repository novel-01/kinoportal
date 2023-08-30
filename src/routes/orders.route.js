const {Router} = require('express');
const { create, getAll, get } = require('../controllers/orders.controller');
const currentUser = require('../middlewares/current-user.middleware');

const isAuth = require('../middlewares/is-auth.middleware')

const  router = Router();

router.post('/order', isAuth, create);
router.get('/order', isAuth, getAll)
router.get('/order/:id', isAuth, get);



module.exports = router;
