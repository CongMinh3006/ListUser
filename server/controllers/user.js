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
    const { mid } = req.body
    const { name, mssv } = req.body
    const response = await User.findByIdAndUpdate(mid, {name, mssv})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? "Update user is successfully" : "Something went wrong"
    })
})

const getAllUser = asyncHandle(async(req,res)=>{
    const response = await User.find()
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : "Something went wrong"
    })
})

const deleteUser = asyncHandle(async(req,res)=>{
    const {mid} = req.body
    const response = await User.findByIdAndDelete(mid)
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