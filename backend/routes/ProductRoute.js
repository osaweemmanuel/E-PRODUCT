import { authenticatedUser,authorizePermission } from '../middleware/authentication.js';

import express from 'express'
import  {createProduct,getAllProduct,getSingleProduct,updateProduct,deleteProduct,uploadProductImage } from '../controller/productController.js';
import { getSingleProductReview } from '../controller/reviewController.js';

const router=express.Router();






router.route('/').post([authenticatedUser,authorizePermission('admin')],createProduct)
.get(getAllProduct)

router.route('/uploadImage').post([authenticatedUser,authorizePermission('admin')],uploadProductImage)
router.route('/:id').get(getSingleProduct).patch([authenticatedUser,authorizePermission('admin')],updateProduct)
.delete([authenticatedUser,authorizePermission('admin')],deleteProduct)

router.route('/:id/reviews').get(getSingleProductReview)





export default router;