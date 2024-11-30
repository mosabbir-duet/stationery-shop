import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { OrderRoutes } from './app/modules/order/order.route';
import { ProductRoutes } from './app/modules/product/product.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', ProductRoutes);
app.use('/api/v1', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    'Welcome to Stationery Shop! What types of item would you like to buy!!!',
  );
});

export default app;
