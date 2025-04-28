import { Router } from "express";
import { createMinistration, deleteMinistration, getAllMinistrations, getOneMinistration, updateMinistration, } from "../controllers/MinistrationController";
import { validateRequest } from "../middlewares/validator";
import { MinistrationRequestDto } from "../DTOs/ministration.dto";

const router = Router();

router.get("/", getAllMinistrations);
router.post("/", validateRequest(MinistrationRequestDto), createMinistration);
router.get("/:id", getOneMinistration);
router.put("/:id", updateMinistration);
router.delete("/:id", deleteMinistration);



export default router;
