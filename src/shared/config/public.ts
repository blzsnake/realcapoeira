type TramvaiState = {
  stores?: {
    environment?: Record<string, string | undefined>;
  };
};

const DEFAULT_YMAPS_API_KEY = 'fcf49c8d-b16f-4277-ab7a-d08242e838b8';
const DEFAULT_SIGNUP_FORM_URL =
  'https://script.google.com/macros/s/AKfycbxTENMLVwQqI9EV99pLIMm5e0-7Jv_k2usEC6ZDZjjb6ZskO31ARW_5jc1pSMIj5wVh/exec';

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

const getPublicEnvDefault = (name: string) => {
  if (name === 'YMAPS_API_KEY') {
    return DEFAULT_YMAPS_API_KEY;
  }

  if (name === 'SIGNUP_FORM_URL') {
    return DEFAULT_SIGNUP_FORM_URL;
  }

  return '';
};

export const getPublicEnv = (name: string) =>
  process.env[name] ||
  readTramvaiClientEnv(name) ||
  getPublicEnvDefault(name) ||
  '';

export const getYmapsApiKey = () => getPublicEnv('YMAPS_API_KEY');

export const getSignupFormUrl = () => getPublicEnv('SIGNUP_FORM_URL');
