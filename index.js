import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
// Езици
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

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

app.get(`${api}/health`, (req, res) => {
  res.send(req.t('bookNotFound')); //ezizi
});

app.listen(port, () => {
  console.log(`Server running at http://localhost: ${port}`);
});

mongoose
  .connect(process.env.CONNECT_STR)
  .then(() => console.log('Connected to Mongo DB successfully ^_^'))
  .catch((err) => console.log(err));