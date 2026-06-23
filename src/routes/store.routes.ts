import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as StoreSchema  from '../schemas/store.schema';
import { validate } from '../middlewares/validate.middleware';
import * as StoreController from '../controllers/store.controller';

const storeRouter = Router();

storeRouter.route('/')
    .get(StoreController.getAllStores)
    .post(authMiddleware, validate(StoreSchema.storeCreateSchema), StoreController.createStore)

storeRouter.route('/:id')
    .get(StoreController.getStoreById)
    .put(authMiddleware, validate(StoreSchema.storeUpdateSchema), StoreController.updateStore)
    .delete(authMiddleware, StoreController.deleteStore)

export { storeRouter };