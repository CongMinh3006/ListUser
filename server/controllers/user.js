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

const updateUser = asyncHandle(async(req,res)=>{
    const { uid, name, mssv } = req.body
    const response = await User.findByIdAndUpdate(uid, {name, mssv})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Update user is successfully" : "Something went wrong"
    })
})

const getAllUser = asyncHandle(async(req,res)=>{
    const queries = {...req.query}
    if(queries.name) queries.name = { $regex: queries.name, $options: 'i' }
    if(queries.mssv) queries.mssv = { $regex: queries.mssv, $options: 'i' }
    const queryCommand = User.find(queries)
    const response = await queryCommand.exec()
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

const deleteUser = asyncHandle(async(req,res)=>{
    const {uid} = req.params
    const response = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Delete user is successfully" : "Something went wrong"
    })
})

module.exports = {
   newUser,
   updateUser,
   getAllUser,
   deleteUser
}