import { runPost } from './axios';

export const registerAccount = async (
  registerCredential: RegisterCredential
) => {
  return await runPost('api/register', registerCredential);
};

export const loginAccount = async (loginCredential: LoginCredential) => {
  return await runPost('api/login', loginCredential);
};
