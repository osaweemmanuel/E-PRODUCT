import express from 'express'
import { authenticatedUser,authorizePermission } from '../middleware/authentication.js';


const router=express.Router();
import  {createProduct,getAllProduct,getSingleProduct,updateProduct,deleteProduct,uploadProductImage } from '../controller/productController.js';
router.route('/').post([authenticatedUser,authorizePermission('admin')],createProduct)
.get(getAllProduct)

router.route('/uploadImage').post([authenticatedUser,authorizePermission('admin')],uploadProductImage)
router.route('/:id').get(getSingleProduct).patch([authenticatedUser,authorizePermission('admin')],updateProduct)
.delete([authenticatedUser,authorizePermission('admin')],deleteProduct)

export default router;