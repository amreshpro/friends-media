const Env =  process.env;

const AllEnvConfig =  {
  NODE_ENV: Env.NEXT_PUBLIC_NODE_ENV,
  PORT: Env.PORT || 4000,
  JWT_SECRET:Env.NEXT_PUBLIC_JWT_SECRET,
  DATABASE_URL: Env.NEXT_PUBLIC_MONGODB_URI
};

export default AllEnvConfig;