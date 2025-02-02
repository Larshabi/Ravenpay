import express, {Express, NextFunction, Request, Response} from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import RouteV1 from './routes/v1';
import ErrorHandler from './helpers/ErrorHandler';

const app: Express = express();

app.use(express.json());
app.use(cors({origin: "*"}));
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));

app.use(morgan('dev'));

app.use(helmet());

RouteV1(app);

app.use(ErrorHandler);

export default app;
