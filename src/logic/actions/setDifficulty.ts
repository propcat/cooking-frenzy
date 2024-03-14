import { actions } from '@logic/actions';

export const setDifficulty: typeof actions.setDifficulty = ({ difficulty }, { game }) => {
  game.difficulty = difficulty;
}