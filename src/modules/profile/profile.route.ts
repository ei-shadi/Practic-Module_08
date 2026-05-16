import { Router } from "express";
import { profileController } from "./profile.controller";


const router = Router();


router.post("/", profileController.createProfile);
router.get("/", profileController.getAllProfiles);
router.get("/:id", profileController.getProfileByUserId);
router.delete("/:id", profileController.deleteProfileByUserId);


export const profileRoute = router;