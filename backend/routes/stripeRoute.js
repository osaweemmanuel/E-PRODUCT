import express from 'express'
import { authenticatedUser } from '../middleware/authentication.js';
import Stripe from 'stripe'
import order from '../models/Order.js'


const router=express.Router();
const stripe=new Stripe("sk_test_51MCfmCF509yUPYZuau2yDbQoKP1iFx1me3WHtifALsAMFaIaCyXyB8molp0feutGuuwzHaBMSwNe2RhKBDKLakrb00d9b9SgBB")


router.post('/',authenticatedUser,async(req,res)=>{
    // const customer=await stripe.customers.create()
   //Fetch customers
//    const customer=await stripe.customers.retrieve('cus_N91c8cBQ1bMS3o')
const customer=await stripe.customers.create({
    name:"emmanuel osawe",
    email:"emmanuellucky25@gmail.com"
})
    res.send('send')
    console.log(customer)
})
export default router;