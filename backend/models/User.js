import mongoose from "mongoose"
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'


const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      unique:true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
     
    },
    role: {
      type: String,
      default: 'user',
      enum:['admin','user']
    },

    phone: {
      type: String,
      required:[true,'Please provide phone number'],
      default: '+234',
    },
  
  },{
    timestamps:true
  }
  )


  UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths())
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  

  UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }

  //Resetting token
  // UserSchema.methods.getResetPasswordToken=function (){
  // //    const resetToken= //crypto.randomBytes(20).toString('hex') + this._id;
  // //   // const resetPasswordToken=crypto.createHash('sha256')
  // //   // .update(resetToken)
  // //   // .digest('hex');

  // //  //resetPasswordExpire=Date.now() + 10 (60 * 1000)
  // //    return resetToken;
  // }


export default mongoose.model('User',UserSchema)