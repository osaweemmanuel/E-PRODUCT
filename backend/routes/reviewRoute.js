import express from 'express'
import { authenticatedUser } from '../middleware/authentication.js';
const router=express.Router();

import {createReview,getAllReview,getSingleReview,updateReview,deleteReview} from '../controller/reviewController.js'

router.route('/').post(authenticatedUser,createReview).get(getAllReview)
router.route('/:id').get(getSingleReview).patch(authenticatedUser,updateReview).delete(authenticatedUser,deleteReview)


export default router;