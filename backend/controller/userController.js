import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import  UnAuthenticatedError from '../errors/unauthenticated.js'
import  BadRequestError  from '../errors/bad-request.js'
import { attachCookiesToResponse } from '../utils/jwt.js'
import createTokenUser from '../utils/createTokenUser.js'
import checkPermission from '../utils/checkPermission.js'



const getAllUser=async(req,res)=>{
  // console.log(req.user)
  const users=await User.find({role:'user'}).select('-password')
  res.status(StatusCodes.OK).json({users})
}

const getSingleUser=async(req,res)=>{
  //  const {id:singleId}=req.params;
   const user=await User.findOne({_id:req.params.id}).select('-password')
   if(!user){
    throw new UnAuthenticatedError(`No user with id: ${req.params.id}`)
   }
   //restricting user
   checkPermission(req.user,user._id)

   res.status(StatusCodes.OK).json({user})
}

const showCurrentUser=async(req,res)=>{
  res.status(StatusCodes.OK).json({user:req.user})
}

const updateUser=async(req,res)=>{
  const {name,email}=req.body;
  if(!name || !email){
    throw new BadRequestError('Please provide all values')
  }
  const user=await User.findOne({_id:req.user.userId});

  user.name=name
  user.email=email
  await user.save()

  const tokenUser=createTokenUser(user)
  attachCookiesToResponse({res,user:tokenUser})
  
  res.status(StatusCodes.OK).json({user:tokenUser})
}

const updateUserPassword=async(req,res)=>{
  const {oldPassword,newPassword}=req.body;
  if(!oldPassword || !newPassword){
    throw new BadRequestError('Please provide all values')
  }
 const user=await User.findOne({_id:req.user.userId})
 const isPasswordCorrect= await user.comparePassword(oldPassword)
 if(!isPasswordCorrect){
    throw new UnAuthenticatedError('Please provide all values')
 }

 user.password=newPassword
 await user.save()
  
 res.status(StatusCodes.OK).json({msg:"Password successfully updated"})
}


export {getAllUser,getSingleUser,showCurrentUser,updateUser,updateUserPassword}