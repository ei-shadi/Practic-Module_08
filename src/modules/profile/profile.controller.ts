import type { Request, Response } from "express";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "Profile Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllProfiles = async (req: Request, res: Response) => {
  try {
    const result = await profileService.getAllProfilesFromDB();

    res.status(200).json({
      success: true,
      message: "Profiles retrieved successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getProfileByUserId = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);

    const { id } = req.params;

    const result = await profileService.getProfileByUserIdFromDB(id as string);

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const deleteProfileByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await profileService.deleteProfileByUserId(id as string);

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  createProfile,
  getAllProfiles,
  getProfileByUserId,
  deleteProfileByUserId,
};

