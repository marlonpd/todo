import { ActionContext, ActionTree } from 'vuex';
import {
  LOGIN,
  LOGOUT,
  REGISTER,
  // CHECK_AUTH,
  // UPDATE_USER,
} from '../../../types/actions.type';
import {
  SET_AUTH,
  PURGE_AUTH,
  SET_ERROR,
  SET_SUCCESS_REGISTRATION,
} from '../../mutations.type';
import { State } from './state';
import { registerAccount, loginAccount } from '../../../services/auth';
import JwtService from '../../../services/jwt';

// interface User {
//   id: string | undefined;
//   email: string;
//   name: string;
//   token: string | undefined;
// }

interface LoginCredential {
  email: string;
  password: string;
}

interface RegisterCredential {
  email: string;
  name: string;
  password: string;
  password2: string;
}


export type Actions = {
  [LOGIN](
    // eslint-disable-next-line no-unused-vars
    context: ActionContext<State, State>,
    // eslint-disable-next-line no-unused-vars
    loginCredential: LoginCredential
  ): void;
  // eslint-disable-next-line no-unused-vars
  [LOGOUT](context: ActionContext<State, State>): void;
  [REGISTER](
    // eslint-disable-next-line no-unused-vars
    context: ActionContext<State, State>,
    // eslint-disable-next-line no-unused-vars
    registerCredential: RegisterCredential
  ): void;
  // [CHECK_AUTH](context: ActionContext<State, State>): void;
  // [UPDATE_USER](context: ActionContext<State, State>, payload: any): void;
};

const actions: ActionTree<State, State> & Actions = {
  [LOGIN](
    context: ActionContext<State, State>,
    loginCredential: LoginCredential
  ) {
    return new Promise((resolve, reject) =>
      loginAccount(loginCredential)
        .then((response: any) => {

          const token: string = response.data.authorisation.token;
          
          JwtService.saveToken(token);
          context.commit(SET_AUTH, response);
          resolve(response);
        })
        .catch((response: any) => {
          reject(response);
        })
    );  
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  async [REGISTER](
    context: ActionContext<State, State>,
    registerCredential: RegisterCredential
  ) {
    return await registerAccount(registerCredential)
      .then(() => {
        context.commit(SET_ERROR, '');
        context.commit(SET_SUCCESS_REGISTRATION);
      })
      .catch(({ response }) => {
        context.commit(SET_ERROR, response.data.error);
      });
  },
  // [CHECK_AUTH](context: ActionContext<State, State>) {
  //   // if (JwtService.getToken()) {
  //   //   ApiService.setHeader();
  //   //   /*ApiService.get("user")
  //   //     .then(({ data }) => {
  //   //       context.commit(SET_AUTH, data.user);
  //   //     })
  //   //     .catch(({ response }) => {
  //   //       context.commit(SET_ERROR, response.data.errors);
  //   //     });*/
  //   // } else {
  //   //   context.commit(PURGE_AUTH);
  //   // }
  // },
  // [UPDATE_USER](context: ActionContext<State, State>, user: User) {
  //   const { id, email, name, token } = user;
  // },
};

export default actions;
