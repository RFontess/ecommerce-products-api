import { Router } from 'express';
import * as CategorySchema  from '../schemas/category.schema';
import { validate } from '../middlewares/validate.middleware';
import * as CategoryController from '../controllers/category.controller';

const categoryRouter = Router({ mergeParams: true});

categoryRouter.route('/')
    .get(CategoryController.getAllCategories)
    .post(validate(CategorySchema.categoryCreateSchema), CategoryController.createCategory)

categoryRouter.route('/:id')
    .get(CategoryController.getCategoryById)
    .put(validate(CategorySchema.categoryUpdateSchema), CategoryController.updateCategory)
    .delete(CategoryController.deleteCategory)

export { categoryRouter };