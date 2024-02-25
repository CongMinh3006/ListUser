const asyncHandle = require('express-async-handler')
const User = require('../models/user')

const newUser = asyncHandle(async(req,res)=>{
    const {name, mssv} = req.body
    if(!name || !mssv){
        throw new Error('Missing input')
    }
    const response = await User.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Add user is successfully" : "Something went wrong"
    })
})

module.exports = {
   newUser
}