import { Router } from "express";
import yearRoute from "./years"
import categoryRoute from "./categories"
import ministerRoute from "./ministers"
import ministrationRoute from "./ministrations"
import authRoute from "./auth"

const router = Router();

router.use('/years', yearRoute)
router.use('/categories', categoryRoute)
router.use('/ministers', ministerRoute)
router.use('/ministrations', ministrationRoute)
router.use('/auth', authRoute)

export default router;



