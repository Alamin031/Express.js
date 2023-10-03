import { Request, Response } from "express";
import UserService from "../services/user.service";

// Get user profile route
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userProfile = await UserService.getUserProfile(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};
