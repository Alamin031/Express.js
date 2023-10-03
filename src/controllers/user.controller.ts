import { Request, Response } from "express";
import UserService from "../services/user.service";

// Sign-up route
export const signup = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newUser = await UserService.signup(data);

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Login route
export const login1 = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login1(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

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
