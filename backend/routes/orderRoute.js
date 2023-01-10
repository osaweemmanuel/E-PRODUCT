
import express  from "express";
const router=express.Router()

import {authenticatedUser,authorizePermission} from '../middleware/authentication.js'
import {createOrder,getAllOrders,getSingleOrder,getCurrentOrder,updateOrder} from '../controller/orderController.js'


router.route('/').post(authenticatedUser,createOrder)
.get(authenticatedUser,authorizePermission('admin'),getAllOrders);

router.route('/showAllMyOrders').get(authenticatedUser,getCurrentOrder)

router.route('/:id').get(authenticatedUser,getSingleOrder).patch(authenticatedUser,updateOrder)

export default router;

