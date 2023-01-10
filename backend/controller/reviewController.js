import Review from '../models/Review.js'
import Product from '../models/Product.js'
import BadRequestError from '../errors/bad-request.js'
import UnAuthenticatedError from '../errors/unauthenticated.js'
import NotFoundError from '../errors/not-found.js'
import { StatusCodes } from 'http-status-codes'
import checkPermission from '../utils/checkPermission.js'




const createReview=async(req,res)=>{
    const {product:productId}=req.body;
    const isValidProduct=await Product.findOne({_id:productId})
    if(!isValidProduct){
        throw new NotFoundError(`There is not product with such ${productId}`)
    }

    const AlreadySubmitted=await Review.findOne({
        product:productId,
        user:req.user.userId
    })

    if(AlreadySubmitted){
        throw new BadRequestError('Review product already exist')
    }

    req.body.user=req.user.userId;

    const review=await Review.create(req.body)
    res.status(StatusCodes.OK).json({review})
};
 


const getAllReview=async(req,res)=>{
  const review=await Review.find({}).populate({path:'product',select:'name company price'})
  res.status(StatusCodes.OK).json({review,count:review.length})
}

const getSingleReview=async(req,res)=>{
    const {id:reviewId}=req.params;
    const reviews=await Review.findOne({_id:reviewId})
    if(!reviews){
        throw new NotFoundError(`There is no review with such ${reviewId}`)
    }
 
  res.status(StatusCodes.OK).json({reviews})
}

const updateReview=async(req,res)=>{
    const {id:reviewId}=req.params;
    const {rating,title,comment}=req.body;
    const reviews=await Review.findOne({_id:reviewId})

    if(!reviews){
        throw new NotFoundError(`No review with such ${reviewId}`)
    }

    checkPermission(req.user,reviews.user)

    reviews.rating=rating;
    reviews.title=title;
    reviews.comment=comment;

    await reviews.save()

    res.status(StatusCodes.OK).json({reviews})

}

const deleteReview=async(req,res)=>{
    const {id:reviewId}=req.params;
    const review=await Review.findOne({_id:reviewId})
    if(!review){
        throw new NotFoundError(`There is no review with such ${reviewId}`)
    }

    checkPermission(req.user,review.user)

    await review.remove()
    res.status(StatusCodes.OK).json({msg:'Review Successfully deleted'})
}

const getSingleProductReview=async(req,res)=>{
    const {id:productId}=req.params;
    const reviews=await Review.find({product:productId})
    res.status(StatusCodes.OK).json({reviews})
}

export {createReview,getAllReview,getSingleReview,updateReview,deleteReview,getSingleProductReview}

