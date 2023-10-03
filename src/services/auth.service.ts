import { Admin } from "../models/admin.entity";
import * as bcrypt from "bcrypt";
import { AdminModel } from "../interface/admin.interface";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../interface/user.interface";
import { User } from "../models/user.entity";

export class AuthService {
  async adminSignup(data: any): Promise<AdminModel> {
    try {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const newAdmin = await Admin.create(data);
      return newAdmin;
    } catch (error: any) {
      throw new Error("Registration failed: " + (error as Error).message);
    }
  }

  async adminLogin(
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
      const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return { admin, token };
    } catch (error: any) {
      throw new Error("Admin login failed: " + error.message);
    }
  }

  async signup(data: any): Promise<UserModel> {
    try {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
      const user = new User(data);

      await user.save();

      return user;
    } catch (error: any) {
      throw new Error("Registration failed: " + (error as Error).message);
    }
  }

  async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    return token;
  }
}
export default new AuthService();
