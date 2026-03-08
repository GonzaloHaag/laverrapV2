export const config = {
  PORT: process.env.PORT || 8000,
  SALT_ROUNDS: 10,
  API_BASE_URL: "/api/v1",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};
if (!config.JWT_SECRET_KEY) {
  console.warn("JWT_SECRET_KEY no está definido en las variables de entorno");
}