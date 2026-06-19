import { Router } from "express";
import * as ProductSchema  from '../schemas/product.schema';
import { validate } from '../middlewares/validate.middleware';
import * as ProductController from '../controllers/product.controller';

const productRouter = Router({ mergeParams: true});

productRouter.route('/')
    .get(ProductController.getAllProducts)
    .post(validate(ProductSchema.productCreateSchema), ProductController.createProduct)

productRouter.route('/:id')
    .get(ProductController.getProductById)
    .put(validate(ProductSchema.productUpdateSchema), ProductController.updateProduct)
    .delete(ProductController.deleteProduct)

export { productRouter };