const { Router } = require('express');
const router = new Router();

router.use('/auth', require('./auth'));
router.use('/other',require('./other'));

module.exports = router;
