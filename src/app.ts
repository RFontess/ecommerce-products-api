import express from 'express';
import { errorMiddleware } from './middlewares/error.middleware';
import { healthRoutes } from './routes/health.routes';
import { storeRouter } from './routes/store.routes';
import { categoryRouter } from './routes/category.routes';
import { productRouter } from './routes/product.routes';

const app = express();

app.use(express.json()); 

app.use('/health', healthRoutes);
app.use('/stores', storeRouter);
app.use('/stores/:storeId/categories', categoryRouter);
app.use('/stores/:storeId/products', productRouter);

app.use(errorMiddleware);

export { app };