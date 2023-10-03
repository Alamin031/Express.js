import { Request, Response } from "express";
import adminService from "../services/admin.service";

//signup route
export const signup = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newAdmin = await adminService.signup(data);

    res.status(201).json(newAdmin);
  } catch (error: any) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { admin, token } = await adminService.login(email, password);

    res.status(200).json({ admin, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

//get all users route
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//delete user route
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await adminService.deleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//update user route
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const updatedUser = await adminService.updateUser(userId, data);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};
