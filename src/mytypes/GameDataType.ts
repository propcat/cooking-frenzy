import { recipes } from '@constants/recipes';
import type { Level } from '@mytypes/Level';
import { Workstation } from './Workstation';
import { Difficulty } from './Difficulty';

export type GameDataType = {
  levels: Level[],
  recipes: typeof recipes,
  workstationProperties: {[key in Workstation]: {
    allowItems: boolean,
    unpackUtensils: boolean,
    allowUtensils: boolean,
  }},
  difficulties: {[ key in Difficulty ]: {
    orderMinInterval: number,
    orderMaxInterval: number,
    orderMinTime: number,
    orderMaxTime: number,
  }},
}