import { Express } from 'express';
import AuthRoute from './auth.route';
import AccountRoute from './account.route';

export default (app: Express) => {
    app.use('/api/v1/auth', AuthRoute);
    app.use('/api/v1/account', AccountRoute);
}