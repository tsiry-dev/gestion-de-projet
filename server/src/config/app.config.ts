export const getEnv = (key: string,defaultValue?: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(
      `❌ Environment variable ${key} n'est pas définie dans (.env)`
    );
  }
  return value;
};

export const config = {
  NODE_ENV: getEnv("NODE_ENV"),
  PORT: getEnv("PORT"),
  FRONTEND_ORIGIN: getEnv("FRONTEND_ORIGIN"),
  BACKEND_ORIGIN: getEnv("BACKEND_ORIGIN"),
  BASE_API: getEnv("BASE_API", '/api/v1'),
  MONGODB_URI: getEnv("MONGO_URI"),
} as const;