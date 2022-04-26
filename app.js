import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRouter from './routers/userRouter.js';
import authResult from './routers/authResult.js';

import { response, not_found, bad_response } from './modules/responseMSG.js';

const app = express();

app.use(express.json());

app.set('port', process.env.PORT || 3001);
app.use(cors('*'));

// api develop part
app.use('/user', userRouter);
app.use('/auth', authResult);

// 404 Error Handling
app.use(async (req, res, next) => {
  res.status(404).json(await not_found());
});

app.use(async (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(await bad_response());
});

app.listen(app.get('port'), () => {
  console.log(`server start : ${app.get('port')}`);
});
