import { Router } from "express";
import { create } from "../controllers/YearController";

const router = Router();

router.post("/", create);


export default router;
