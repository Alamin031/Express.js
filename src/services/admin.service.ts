import { Admin } from "../models/admin.entity";
import * as bcrypt from "bcrypt";
import { AdminModel } from "../interface/admin.interface";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../interface/user.interface";
import { User } from "../models/user.entity";

export class AdminService {
  async signup(data: any): Promise<AdminModel> {
    try {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const newAdmin = await Admin.create(data);
      return newAdmin;
    } catch (error: any) {
      throw new Error("Registration failed: " + (error as Error).message);
    }
  }
  // async login(email: string, password: string): Promise<string> {
  //     const admin = await Admin.findOne({ email });
  //     if (!admin) {
  //       throw new Error("Admin not found");
  //     }
  //     const isPasswordValid = await bcrypt.compare(password, admin.password);
  //     if (!isPasswordValid) {
  //       throw new Error("Invalid password");
  //     }
  //     const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
  //         expiresIn: "1h",
  //     });
  //     return token;
  // }

  async login(
    email: string,
    password: string
  ): Promise<{ admin: AdminModel; token: string }> {
    try {
      const admin = await Admin.findOne({ email });

      if (!admin) {
        throw new Error("Admin not found");
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Generate a JWT token for the authenticated admin
      const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return { admin, token };
    } catch (error: any) {
      throw new Error("Admin login failed: " + error.message);
    }
  }

  //get all users
  //get all users
  async getAllUsers(): Promise<UserModel[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error("Fetching users failed: " + error.message);
    }
  }

  //delete user
  async deleteUser(userId: string): Promise<UserModel | null> {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser ? deletedUser.toObject() : null;
    } catch (error: any) {
      throw new Error("Deleting user failed: " + error.message);
    }
  }

  //update user
  async updateUser(userId: string, data: any) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      if (data.password) {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(userId, data, {
        new: true,
      });

      return updatedUser;
    } catch (error: any) {
      throw new Error("Updating user failed: " + error.message);
    }
  }
}
export default new AdminService();
