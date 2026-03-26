type TramvaiState = {
  stores?: {
    environment?: Record<string, string | undefined>;
  };
};

const readTramvaiClientEnv = (name: string) => {
  if (typeof window === 'undefined') {
    return '';
  }

  const tramvaiState = Reflect.get(window, '__TRAMVAI_STATE__') as
    | TramvaiState
    | undefined;

  return tramvaiState?.stores?.environment?.[name];
};

export const getPublicEnv = (name: string) =>
  process.env[name] || readTramvaiClientEnv(name) || '';

export const getYmapsApiKey = () => getPublicEnv('YMAPS_API_KEY');

export const getSignupFormUrl = () => getPublicEnv('SIGNUP_FORM_URL');
