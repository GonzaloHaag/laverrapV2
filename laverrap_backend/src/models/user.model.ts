import { prisma } from "../lib/prisma.js";

export const userModel = {
  async findByEmail({ email } : { email:string }) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return user;
  }
};