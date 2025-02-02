import { Express } from 'express';
import AuthRoute from './auth.route';

export default (app: Express) => {
    app.use('/api/v1/auth', AuthRoute);
}