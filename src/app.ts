import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://dbnurudeen:nurudeen992@cluster0.89qyi.mongodb.net/tcv')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB...'));

app.get('/', (req, res) => {
  res.send('Hello Here!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});