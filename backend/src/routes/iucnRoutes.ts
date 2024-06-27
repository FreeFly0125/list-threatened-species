import { Router } from "express";
import { getRegions, getSpeciesByRegion, getSpeciesByCR } from "controllers/speciesController";


const router = Router();

router.get('/regions', getRegions);
router.get('/species', getSpeciesByRegion);
router.get('/measures', getSpeciesByCR);

export default router;