import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';

export const store = createStore({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: { auth },
});

// export function useStore() {
//   return store as Store<>;
// }
