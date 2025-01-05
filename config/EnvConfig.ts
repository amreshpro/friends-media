const Env =  process.env;

const AllEnvConfig =  {
  NODE_ENV: Env.NODE_ENV,
  PORT: Env.PORT || 4000,
  JWT_SECRET:Env.JWT_SECRET,
  DATABASE_URL: Env.MONGODB_URI
};

export default AllEnvConfig;