import { Router } from "express";
import { createMinister, deleteMinister, getAllMinisters, getOneMinister, updateMinister } from "../controllers/MinisterController";

const router = Router();

router.get("/", getAllMinisters);
router.post("/", createMinister);
router.get("/:id", getOneMinister);
router.put("/:id", updateMinister);
router.delete("/:id", deleteMinister);

export default router;
