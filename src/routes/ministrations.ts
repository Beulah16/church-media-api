import { Router } from "express";
import { createMinistration, deleteMinistration, getAllMinistrations, getOneMinistration, updateMinistration, } from "../controllers/MinistrationController";
import { validate } from "../middlewares/validator";
import { validateMinistrationRequest } from "../validators/ministrationValidator";
import { isLoggedIn } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/role.middleware";
import { idExists } from "../middlewares/data-exists.middleware";
import { Ministration } from "../models/Ministration";

const router = Router();

router.get("/", getAllMinistrations);
router.get("/:id", idExists(Ministration), getOneMinistration);

router.use("/", isLoggedIn, isAdmin); 
router.post("/", validateMinistrationRequest, validate, createMinistration);

router .use("/:id", idExists(Ministration)); 
router.put("/:id",  updateMinistration);
router.delete("/:id", deleteMinistration);



export default router;
