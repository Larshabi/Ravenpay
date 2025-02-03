import { Router } from "express";
import asyncHandler from "../../helpers/AsyncHandler";
import authorization from "../../helpers/Authorization";
import AccountController from "../../controllers/account/account.controller";

const AccountRoute = Router();

AccountRoute.post('/create', authorization, asyncHandler(AccountController.GenerateAccount));

AccountRoute.post('/transfer', authorization, asyncHandler(AccountController.Transfer));

export default AccountRoute;