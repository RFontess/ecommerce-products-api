import { Router } from 'express';
import * as StoreController from '../controllers/store.controller';

const storeRouter = Router();

storeRouter.route('/')
    .get(StoreController.getAllStores)
    .post(StoreController.createStore)

storeRouter.route('/:id')
    .get(StoreController.getStoreById)
    .put(StoreController.updateStore)
    .delete(StoreController.deleteStore)

export { storeRouter };