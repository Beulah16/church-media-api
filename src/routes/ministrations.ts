import { Router } from "express";
import { createMinistration, deleteMinistration, getAllMinistrations, getOneMinistration, updateMinistration, } from "../controllers/MinistrationController";
import { validate } from "../middlewares/validator";
import { validateMinistrationRequest } from "../validators";

const router = Router();

router.get("/", getAllMinistrations);
router.post("/", validateMinistrationRequest, validate, createMinistration);
router.get("/:id", getOneMinistration);
router.put("/:id", updateMinistration);
router.delete("/:id", deleteMinistration);



export default router;
