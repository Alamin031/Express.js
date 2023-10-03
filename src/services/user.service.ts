import { User } from "../models/user.entity";
import { UserModel } from "../interface/user.interface";
import * as jwt from "jsonwebtoken";

import * as bcrypt from "bcrypt";

export class UserService {
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

  async getUserProfile(userId: string) {
    try {
      const userProfile = await User.findById(userId);

      if (!userProfile) {
        throw new Error("User profile not found");
      }

      const { _id, name, email } = userProfile;

      return { _id, name, email };
    } catch (error: any) {
      throw new Error("Fetching user profile failed: " + error.message);
    }
  }

  async login1(email: string, password: string): Promise<string> {
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

export default new UserService();
