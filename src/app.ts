import { error } from 'console';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/order/order.route';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message:
      'Welcome to Stationery Shop! What types of item would you like to buy!!!',
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'Page not found. The requested route does not exist.',
    success: false,
    error: error,
  });
});

export default app;
