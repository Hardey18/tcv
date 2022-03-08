import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import events from './routes/events'
import auth from './routes/auth'

const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD } = process.env;
const app = express();


const port = 3000;

mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors())

app.use('/events', events);
app.use('/auth', auth);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});