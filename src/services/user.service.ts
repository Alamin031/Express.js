import { User } from "../models/user.entity";
import { UserModel } from "../interface/user.interface";
import * as jwt from "jsonwebtoken";

import * as bcrypt from "bcrypt";

export class UserService {
  

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

}

export default new UserService();
