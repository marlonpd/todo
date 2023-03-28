import { registerAccount, loginAccount } from '../services/auth';
import { LOGOUT } from '../types/actions.type';
import { computed } from 'vue';
import { useStore } from 'vuex';

export function useAuth() {
  const store = useStore();

  async function submitRegister(registerCredential: RegisterCredential) {
    return await registerAccount(registerCredential);
  }

  async function submitLogin(loginCredential: LoginCredential) {
    return await loginAccount(loginCredential);
  }

  function doLogout() {
    store.dispatch(LOGOUT);
  }

  const isAuthenticated = computed(() => store.getters.isAuthenticated);

  return {
    submitRegister,
    submitLogin,
    doLogout,
    isAuthenticated,
  };
}
