import { Request, Response } from "express";
import authService from "../services/auth.service";

//signup route
export const adminSignup = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newAdmin = await authService.adminSignup(data);

    res.status(201).json(newAdmin);
  } catch (error: any) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { admin, token } = await authService.adminLogin(email, password);

    res.status(200).json({ admin, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

// Sign-up route
export const signup = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newUser = await authService.signup(data);

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Login route
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
