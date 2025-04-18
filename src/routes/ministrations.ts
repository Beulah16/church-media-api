import { Router } from "express";
import { createMinistration, deleteMinistration, getAllMinistrations, getOneMinistration, updateMinistration, } from "../controllers/MinistrationController";

const router = Router();

router.get("/", getAllMinistrations);
router.post("/", createMinistration);
router.get("/", getOneMinistration);
router.put("/", updateMinistration);
router.delete("/", deleteMinistration);



export default router;
