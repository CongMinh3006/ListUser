const router = require("express").Router()
const ctrls = require('../controllers/user')

router.post('/newUser',ctrls.newUser)
router.get('/',ctrls.getAllUser)
router.post('/',ctrls.updateUser)
router.delete('/',ctrls.deleteUser)

module.exports = router