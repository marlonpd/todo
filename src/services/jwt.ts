const ID_TOKEN_KEY = 'id_token';

export const getToken = (): string | undefined => {
  const token: string | null = window.localStorage.getItem(ID_TOKEN_KEY);

  console.log(window.localStorage);

  if (token) {
    return token.toString();
  }

  return undefined;
};

export const saveToken = (token: string): void => {

  console.log('--saveToken--');
  console.log(token);
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = (): void => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };
