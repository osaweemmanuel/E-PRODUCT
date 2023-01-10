import express from 'express'
import {authenticatedUser} from '../middleware/authentication.js'
import Stripe from 'stripe'
const router=express.Router()


const stripe=new Stripe("sk_test_51MCfmCF509yUPYZuau2yDbQoKP1iFx1me3WHtifALsAMFaIaCyXyB8molp0feutGuuwzHaBMSwNe2RhKBDKLakrb00d9b9SgBB")


router.get('/getstripesession/:sessionId',authenticatedUser,async(req,res)=>{
    const {sessionId}=req.params;
     const session=await checkout.session.retrieve(sessionId)
     res.send(session)
})


router.post('/create-checkout-session',authenticatedUser,async(req,res)=>{
   const customer=await stripe.customers.create({
    metadata:{
        user:req.body.userId,
        email:req.body.email
    },
   });


const line_items=req.body.cartItems.map(item=>{
    return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.amount,
      };
})



})


export default router;