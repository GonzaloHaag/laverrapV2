export const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000"
];


const today = new Date();
export const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
export const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

export const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
export const lastDayOfYear = new Date(today.getFullYear(), 11, 31);