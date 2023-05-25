const envConfig = {
  MONGODB_URI: process.env.MONGODB_URI as string,
  SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD as string,
  COOKIE_NAME: process.env.COOKIE_NAME as string,
  NODE_ENV: process.env.NODE_ENV as string,
};

export default envConfig;
