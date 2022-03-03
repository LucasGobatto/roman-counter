import express from 'express';
import * as path from 'path';
import cors from 'cors';

const htmlPath = path.join(__dirname, 'index.html'); 

const app = express();
app.use(cors);

app.get('/', (req, res) => {
  res.status(200);
  res.send(require(htmlPath));
})

app.listen(4000, () => {
  console.log("http://localhost:4000")
})
