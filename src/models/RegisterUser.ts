import { model, models, Schema } from "mongoose";

const RegisterUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: (pass: string) => {
        if (!pass.length || pass.length < 5) {
          new Error("Password must be at least 5 characters!");
          return false;
        }
      },
    },
  },
  { timestamps: true }
);

export const RegisterUser =
  models?.RegisterUser || model("RegisterUser", RegisterUserSchema);
