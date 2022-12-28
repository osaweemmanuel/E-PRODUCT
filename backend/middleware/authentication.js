
import { resolveHostname } from 'nodemailer/lib/shared/index.js';
import {UnAuthenticatedError,UnAuthorizedError} from '../errors/index.js'
import { isTokenValid } from '../utils/jwt.js'

const authenticatedUser=async(req,res,next)=>{
    const token=req.signedCookies.token;
    if(!token){
        throw new UnAuthenticatedError('Authentication invalid')
    }
   
    try{
   
       const {userId,role,name,email}=isTokenValid({token})
       req.user={userId,role,name,email}
       next()
    //    console.log(payload)
    }catch(error){
        throw new UnAuthenticatedError('Authentication invalid')
    }
  
}


// const authorizePermission=async(req,res,next)=>{
//     if(req.user.role!=='admin'){
//         throw new UnAuthorizedError('unauthorized to access this route')
//     }

//    next()
// }

const authorizePermission=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new UnAuthenticatedError('Unathorize to access this route')
        }
        next()
    }
}

export {authenticatedUser,authorizePermission}