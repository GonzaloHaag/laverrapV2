
import { config } from "../config.js";
import { userModel } from "../models/user.model.js";
import { ClientError } from "../utils/errors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const authService = {
  async login({ email, password }: { email: string, password: string }) {
    const findUser = await userModel.findByEmail({ email });
    if (!findUser) throw new ClientError("Credenciales inválidas", 401);
    const isValidPassword = await bcrypt.compare(password, findUser.password);
    if (!isValidPassword) throw new ClientError("Credenciales inválidas", 401);
    /** Crear token */
    const { password: _, ...user } = findUser;
    const token = jwt.sign({
      user
    }, config.JWT_SECRET_KEY!, { expiresIn: "2h" });
    return { user, token };
  }
};