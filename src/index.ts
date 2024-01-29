import app from './app';
import config from './config';
import mongoose from 'mongoose';

const port = process.env.POST || 8000;

mongoose
  .connect(config.mongo_url)
  .then(() => {
    console.log('Connected to mongodb database');
  })
  .catch(() => {
    console.error('Failed to connect to mongodb database');
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
