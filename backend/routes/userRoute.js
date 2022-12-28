import express from 'express'
import {authenticatedUser,authorizePermission} from '../middleware/authentication.js'
const router=express.Router()

import { getAllUser,getSingleUser,showCurrentUser,updateUser,updateUserPassword } from '../controller/userController.js'


router.route('/').get(authenticatedUser,authorizePermission('admin'),getAllUser)
router.route('/showMe').get(authenticatedUser,showCurrentUser)
router.route('/:id').get(authenticatedUser,getSingleUser)
router.route('/updateUser').patch(authenticatedUser,updateUser)
router.route('/updateUserPassword').patch(authenticatedUser,updateUserPassword)




export default router