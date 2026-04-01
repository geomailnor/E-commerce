import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routs.js';
// Езици
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import cors from 'cors';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.routes.js';
import morgan from 'morgan';
import { authMiddleware } from './middleware/auth.middleware.js';

i18next
  .use(backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: 'locales/{{lng}}.json'
    }
  }); //Езици

const app = express();
const port = process.env.PORT || 3000;
const api = process.env.API;

app.use(middleware.handle(i18next)); //Езици
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({
  origin: ['http://localhost:3000', 'http://mydomain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language']
}));
app.use(authMiddleware);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/auth`, authRouter);
app.use(`${api}/products`, productRouter);


app.get(`${api}/health`, (req, res) => {
  res.send(req.t('firstNameRequired')); //Езици
  res.json({ status: 'OK', message: 'Health check passed' }); // ← ПРОМЕНИ
});

app.listen(port, () => {
  console.log(`Server running at http://localhost: ${port}`);
});

mongoose
  .connect(process.env.CONNECT_STR)
  .then(() => console.log('Connected to Mongo DB successfully ^_^'))
  .catch((err) => console.log(err));