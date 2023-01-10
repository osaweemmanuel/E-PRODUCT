import Stripe from 'stripe'
import Order from '../models/Order.js';

const stripe=new Stripe("sk_test_51MCfmCF509yUPYZuau2yDbQoKP1iFx1me3WHtifALsAMFaIaCyXyB8molp0feutGuuwzHaBMSwNe2RhKBDKLakrb00d9b9SgBB")


const CreatePayment=async(req,res)=>{
   
    const checkoutItems = req.body.checkoutItems;
    const currency = req.body.currency || "usd";
    const asService = req.body.asService;

    const session = await stripe.checkout.sessions.create({
      line_items: checkoutItems.map((items) =>{
            return{price_data:{
                currency: currency,
                product_data:{ name: items.name},
                unit_amount: items.price,
                quantity: items.amount,
            } }
        }),
        mode: 'payment',
        success_url: `${process.env.SUCCESS_CLIENT_URl}`,
        cancel_url:  `${process.env.FAIL_CLIENT_URl}`,
      });
    
       console.log(session)
       if(asService){
        return {success:true}
       }
      res.redirect(303, session.success_url);
}

export default CreatePayment