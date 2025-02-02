import { Router } from "express";
import asyncHandler from "../../helpers/AsyncHandler";
import AuthController from "../../controllers/auth/auth.controller";

const AuthRoute = Router();

AuthRoute.post('/user/register', asyncHandler(AuthController.CreateUser));

export default AuthRoute;