import express from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import routes from './routes';
import cookieParser from 'cookie-Parser'; 
require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(cookieParser());

app.use(express.json());



app.use('/', routes); 

app.listen(PORT, () =>
  console.log(`Server Running on port: http://localhost${PORT}`)
);
