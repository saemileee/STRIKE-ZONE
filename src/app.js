import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { v1Router } from './router';

dotenv.config();

const { MONGO_URL } = process.env;

const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ extended: false }));

mongoose.set('strictQuery', false);

app.use('/api/v1', v1Router);

mongoose.connect(MONGO_URL);

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

export default app;
