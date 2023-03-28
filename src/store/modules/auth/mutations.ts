import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_SUCCESS_REGISTRATION,
} from '../../mutations.type';
import { MutationTree } from 'vuex';
import { State } from './state';
import JwtService from '../../../services/jwt';

export type Mutations = {
  [SET_ERROR](state: State, error: any): void;
  [SET_AUTH](state: State, data: any): void;
  [SET_SUCCESS_REGISTRATION](state: State): void;
  [PURGE_AUTH](state: State): void;
};

const mutations: MutationTree<State> & Mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, response) {
    state.isAuthenticated = true;
    state.user = response.data.user;
    state.errors = {};
    JwtService.saveToken(response.data.authorisation.token);
  },
  [SET_SUCCESS_REGISTRATION](state) {
    state.isSuccessRegistration = true;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = { id: '', name: '', email: '', token: '' };
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default mutations;
