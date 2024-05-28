import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import customerRoutes from './routes/customerRoutes';

const app = express();

app.use(express.json());
app.use('/customer', customerRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;