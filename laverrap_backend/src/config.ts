export const config = {
  PORT: process.env.PORT || 8000,
  SALT_ROUNDS: 10,
  API_BASE_URL: "/api/v1",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
};
if (!config.JWT_SECRET_KEY) {
  console.warn("JWT_SECRET_KEY no está definido en las variables de entorno");
}
if (!config.DATABASE_URL) {
  console.warn("DATABASE_URL no está definido en las variables de entorno");
}