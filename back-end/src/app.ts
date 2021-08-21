import { auth } from '../src/middlewares/auth';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import { connectServerToDB } from './config/db';
import { routerAuth } from './routes/auth'
import { routerContact } from './routes/contact'
import './config/env'


export const app = express();
connectServerToDB()

app.use(cors());
app.use(bodyParser.json())
app.use(logger('dev'))


app.use('/auth', routerAuth);
app.use(auth)
app.use('/contact', routerContact);