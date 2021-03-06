import express from 'express';
import Users from '../controllers/Users';
import isAuthorized from '../middlewares/isAuthorized';
import modelValidator from '../helpers/modelValidator';
import { userIdCheck } from '../middlewares/validationHelper';
import { userValidation, userEmailValidation, userUpdateValidation } from '../validations/userValidation';

const router = express.Router();

router.post('/signUp', modelValidator(userValidation), userEmailValidation, Users.createUser);
router.get('/user', isAuthorized, Users.getUser);
router.post('/login', Users.loginUser);
router.put('/user', isAuthorized, modelValidator(userUpdateValidation), Users.updateUserDetails);

export default router;
