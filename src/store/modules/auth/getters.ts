import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  currentUser(state: State): User;
  isAuthenticated(state: State): boolean;
  isSuccessRegistration(state: State): boolean;
};

const getters: GetterTree<State, State> & Getters = {
  currentUser(state: State) {
    return state.user;
  },
  isAuthenticated(state: State) {
    return state.isAuthenticated;
  },
  isSuccessRegistration(state: State) {
    return state.isSuccessRegistration;
  },
};

// export type Getters = {
//   completedTaskCount(state: State): number
//   totalTaskCount(state: State): number
//   getTaskById(state: State): (id :number) => TaskItem | undefined
// }

// export const getters: GetterTree<State, State> & Getters = {
//   completedTaskCount(state) {
//     return state.tasks.filter(element => element.completed).length
//   },
//   totalTaskCount(state) {
//     return state.tasks.length
//   },
//   getTaskById: (state) => (id: number) => {
//     return state.tasks.find(task => task.id === id)
//   }
// }

export default getters;
