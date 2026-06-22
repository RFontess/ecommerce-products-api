import { Router } from 'express';
import * as AuthSchema  from '../schemas/auth.schema';
import { validate } from '../middlewares/validate.middleware';
import * as AuthController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.route('/register')
    .post(validate(AuthSchema.authRegisterSchema),AuthController.register)

authRouter.route('/login')
    .post(validate(AuthSchema.authLoginSchema),AuthController.login)

export { authRouter };