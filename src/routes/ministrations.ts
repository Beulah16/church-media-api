import { Router } from "express";
import { create } from "../controllers/MinistrationController";

const router = Router();

router.post("/", create);


export default router;
