const router = require("express").Router()
const ctrls = require('../controllers/user')

router.post('/newUser',ctrls.newUser)

module.exports = router