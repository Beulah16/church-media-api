import { Router } from "express";
import { create } from "../controllers/MinisterController";

const router = Router();

router.post("/", create);


export default router;
