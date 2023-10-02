import mongoose, { Document, Schema } from "mongoose";
import { CustomerModel } from "../interface/user.interface";

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Customer = mongoose.model<CustomerModel>(
  "Customer",
  customerSchema
);
