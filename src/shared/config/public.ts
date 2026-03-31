type TramvaiState = {
  stores?: {
    environment?: Record<string, string | undefined>;
  };
};

let cachedTramvaiState: TramvaiState | null | undefined;

const readTramvaiState = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  if (cachedTramvaiState !== undefined) {
    return cachedTramvaiState;
  }

  const stateElement = document.getElementById('__TRAMVAI_STATE__');

  if (!stateElement?.textContent) {
    cachedTramvaiState = null;

    return cachedTramvaiState;
  }

  try {
    cachedTramvaiState = JSON.parse(stateElement.textContent) as TramvaiState;
  } catch {
    cachedTramvaiState = null;
  }

  return cachedTramvaiState;
};

const readTramvaiClientEnv = (name: string) => {
  if (typeof window === 'undefined') {
    return '';
  }

  const tramvaiState = readTramvaiState();

  return tramvaiState?.stores?.environment?.[name];
};

export const getPublicEnv = (name: string) =>
  process.env[name] || readTramvaiClientEnv(name) || '';

export const getYmapsApiKey = () => getPublicEnv('YMAPS_API_KEY');

export const getSignupFormUrl = () => getPublicEnv('SIGNUP_FORM_URL');
