import { Router } from "express";
import { authMiddleware } from '../middlewares/auth.middleware';
import * as ProductSchema  from '../schemas/product.schema';
import { validate } from '../middlewares/validate.middleware';
import * as ProductController from '../controllers/product.controller';

const productRouter = Router({ mergeParams: true});

productRouter.route('/')
    .get(ProductController.getAllProducts)
    .post(authMiddleware, validate(ProductSchema.productCreateSchema), ProductController.createProduct)

productRouter.route('/:id')
    .get(ProductController.getProductById)
    .put(authMiddleware, validate(ProductSchema.productUpdateSchema), ProductController.updateProduct)
    .delete(authMiddleware, ProductController.deleteProduct)

export { productRouter };