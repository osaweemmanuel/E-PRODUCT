import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError, UnAuthenticatedError} from '../errors/index.js'
import { attachCookiesToResponse, createJWT } from '../utils/jwt.js'
import createTokenUser from '../utils/createTokenUser.js'


const register=async(req,res)=>{
    const {email,name,password}=req.body

    //first register user is admin
    const isFirstAccount=await User.countDocuments({}) === 0;
    const role=isFirstAccount?"admin":"user";

    const emailAlreadyExist=await User.findOne({email})
    if(emailAlreadyExist){
        throw new BadRequestError('Your email or password does not exist')
    }

    const user=await User.create({name,email,password,role})

    //creating token1+
    const tokenUser=createTokenUser(user)

    attachCookiesToResponse({res,user:tokenUser})
    //  const token=createJWT({payload:tokenUser})
     //creating cookie
    //  const oneDay= 1000 * 60 * 60 * 24;
    //  res.cookie('token',token,{
    //     httpOnly:true,
    //     expires: new Date(Date.now() + oneDay)
    //  })

    res.status(StatusCodes.CREATED).json({user:tokenUser,})
}

const login=async(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password){
    throw new BadRequestError('Please provide all values')
   }

   const user=await User.findOne({email})
   if(!user){
    throw new UnAuthenticatedError('Invalid credentials')
   }

   const isPasswordCorrect=await user.comparePassword(password);
   if(!isPasswordCorrect){
    throw new UnAuthenticatedError('Invalid credentials')
   }

   const tokenUser=createTokenUser(user);
   attachCookiesToResponse({res,user:tokenUser});
   res.status(StatusCodes.OK).json({user:tokenUser});

   
}

const logout=async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now() + 1000)
    })
    res.status(StatusCodes.OK).json({msg:'user logged out successfully'})
}

export {register,login,logout}