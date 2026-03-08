import "dotenv/config";
import { Pool } from "pg";
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";
import { config } from "../src/config";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
async function main() {
  const testuser = await prisma.user.upsert({
    where: { email: "testing@example.com" },
    update: {},
    create: {
      email: "testing@example.com",
      name: "Test User",
      password: await bcrypt.hash("password123", config.SALT_ROUNDS),
    },
  });
  console.log("Seeders ejecutados correctamente", { testuser });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });