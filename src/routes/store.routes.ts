import { Router } from 'express';
import * as StoreSchema  from '../schemas/store.schema';
import { validate } from '../middlewares/validate.middleware';
import * as StoreController from '../controllers/store.controller';

const storeRouter = Router();

storeRouter.route('/')
    .get(StoreController.getAllStores)
    .post(validate(StoreSchema.storeCreateSchema), StoreController.createStore)

storeRouter.route('/:id')
    .get(StoreController.getStoreById)
    .put(validate(StoreSchema.storeUpdateSchema), StoreController.updateStore)
    .delete(StoreController.deleteStore)

export { storeRouter };