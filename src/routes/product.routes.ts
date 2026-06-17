import { Router } from "express";
import * as ProductController from '../controllers/product.controller';

const productRouter = Router({ mergeParams: true});

productRouter.route('/')
    .get(ProductController.getAllProducts)
    .post(ProductController.createProduct)

productRouter.route('/:id')
    .get(ProductController.getProductById)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct)

export { productRouter };