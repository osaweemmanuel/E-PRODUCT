import { StatusCodes } from 'http-status-codes'
import BadRequestError from '../errors/bad-request.js';
import UnAuthenticatedError from '../errors/unauthenticated.js';
import Product from '../models/Product.js'
import path from 'path';


const createProduct=async(req,res)=>{
  req.body.user=req.user.userId;
  const product=await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({product})

}

const getAllProduct=async(req,res)=>{
  const product=await Product.find({})
  res.status(StatusCodes.OK).json({product,count:product.length})
  
}

const getSingleProduct=async(req,res)=>{
  const {id:productId}=req.params;

  const product=await Product.findOne({_id:productId})
  if(!product){
    throw new BadRequestError(`No product with such ${productId}`)
  }

  res.status(StatusCodes.OK).json({product})


}

const deleteProduct=async(req,res)=>{
 
  const {id:productId}=req.params;
  const product=await Product.findOne({_id:productId})
  if(!product){
    throw new BadRequestError(`The product ${productId} does not exist`)
  }

  await product.remove()
  res.status(StatusCodes.OK).json({product,msg:'Product successfully deleted'})
}

const updateProduct=async(req,res)=>{
  const {id:productId}=req.params
  const product=await Product.findOneAndUpdate({_id:productId},req.body,{ new:true, runValidators:true })
   
  if(!product){
    throw new BadRequestError(`The product ${productId} does not exist`)
  }

   res.status(StatusCodes.OK).json({product})
}

const uploadProductImage=async(req,res)=>{
  if (!req.files) {
    throw new BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Upload Image');
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError(
      'Please upload image smaller than 1MB'
    );
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });

};



 
export {createProduct,getAllProduct,getSingleProduct,updateProduct,deleteProduct,uploadProductImage}