import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import Product from '../models/Product.js'
import Order from '../models/Order.js';
import CreatePayment from "./paymentController.js";



const createOrder=async(req,res)=>{
 
   const {items:cartItems,tax,shippingFee}=req.body;
   if(!cartItems || cartItems.length < 1){
    throw new BadRequestError('There is no product in the cart')
   }
  
   if(!tax || !shippingFee){
    throw new BadRequestError('Provide tax and shipping fee')
   }

   let subtotal=0;
   let orderItems=[];

   for(const item of cartItems){
      const dbProduct=await Product.findOne({_id:item.product});
      if(!dbProduct){
        throw new NotFoundError(`There is no product with such ${item.product}`)
      }
      const {name,price,image,_id}=dbProduct;
      const singleOrderItem={
        name,
        image,
        price,
        amount:item.amount,
        product:_id,
        
      };

      orderItems=[...orderItems,singleOrderItem];

      //calculate the subtotal to the product
      console.log("rederItems ", orderItems);
      if(orderItems && Object.keys(orderItems).length < 1){
        res.status(401).send({success:false, error:"Missing field. Checkout Details"});
      }
      subtotal+= item.amount * price;
      req.body.checkoutItems = orderItems;
      req.body.asService = true;
      const paymentLink = await CreatePayment(req, res);
      res.status(303).send({success:true, paymentLink});
   }

//calculate the sum total
const total=tax + shippingFee + subtotal;

//creating the order


const order = await Order.create({
  orderItems,
  total,
  subtotal,
  tax,
  shippingFee,
  user: req.user.userId,
});

res.status(StatusCodes.CREATED).json({ order});
}

const getAllOrders=async(req,res)=>{
    res.send('GET ALL ORDER')
}

const getSingleOrder=async(req,res)=>{
    res.send('get single order')
}

const getCurrentOrder=async(req,res)=>{
    res.send('get current order')
}

const updateOrder=async(req,res)=>{
    res.send('update order')
}

export {createOrder,getAllOrders,getSingleOrder,getCurrentOrder,updateOrder}