import { Router } from "express";
import { DashboardAbt } from "../Controller/Dashboard.js";

const router = Router()

router.get('/',DashboardAbt)

export default router;