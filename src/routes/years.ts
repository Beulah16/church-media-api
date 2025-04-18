import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../controllers/YearController";

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", remove);


export default router;
