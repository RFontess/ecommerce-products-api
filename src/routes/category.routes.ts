import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as CategorySchema  from '../schemas/category.schema';
import { validate } from '../middlewares/validate.middleware';
import * as CategoryController from '../controllers/category.controller';

const categoryRouter = Router({ mergeParams: true});

categoryRouter.route('/')
    .get(CategoryController.getAllCategories)
    .post(authMiddleware, validate(CategorySchema.categoryCreateSchema), CategoryController.createCategory)

categoryRouter.route('/:id')
    .get(CategoryController.getCategoryById)
    .put(authMiddleware, validate(CategorySchema.categoryUpdateSchema), CategoryController.updateCategory)
    .delete(authMiddleware, CategoryController.deleteCategory)

export { categoryRouter };