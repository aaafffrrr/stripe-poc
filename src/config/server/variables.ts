type EnvVariables = {
  STRIPE_SECRET_KEY: string;
};

type Options = {
  defaultValue?: string;
  prefix?: string;
};

const getEnvVariable = (
  key: string,
  { defaultValue = undefined, prefix = '' }: Options = {}
): string => {
  const envKey = prefix ? `${prefix}_${key}` : key;
  const value = process.env[envKey] || defaultValue;

  if (typeof value === 'undefined') {
    throw new Error(
      `Environment variable ${envKey} is not set and no default value is provided.`
    );
  }

  return value;
};

const config: EnvVariables = {
  STRIPE_SECRET_KEY: getEnvVariable('STRIPE_SECRET_KEY'),
};

export default config;
