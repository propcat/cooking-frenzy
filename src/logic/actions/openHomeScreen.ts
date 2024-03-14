import { actions } from '@logic/actions';

export const openHomeScreen: typeof actions.openHomeScreen = (_, { game }) => {
  game.status = 'menu';
}