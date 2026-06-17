import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';

const categoryRouter = Router({ mergeParams: true});

categoryRouter.route('/')
    .get(CategoryController.getAllCategories)
    .post(CategoryController.createCategory)

categoryRouter.route('/:id')
    .get(CategoryController.getCategoryById)
    .put(CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory)

export { categoryRouter };