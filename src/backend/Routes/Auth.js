import { Router } from "express";
import { AuthenticateNewUser, LoginAuthencticatedSubscriber } from "../Controller/Auth.js";

const router = Router();

router.post("/register", AuthenticateNewUser ).post('/login',LoginAuthencticatedSubscriber)

export default router;
