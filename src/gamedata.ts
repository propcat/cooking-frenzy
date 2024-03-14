import { recipes } from '@constants/recipes';
import { Level1 } from '@levels/Level1';
import { Level2 } from '@levels/Level2';
import { Level3 } from '@levels/Level3';
import type { GameDataType } from '@mytypes/GameDataType';

export const GameData: GameDataType = {
  levels: [ Level1, Level2, Level3 ],
  recipes: recipes,
  workstationProperties: {
    chukaman_steamer: {
      allowItems: true,
      allowUtensils: false,
      unpackUtensils: true,
    },
    counter: {
      allowItems: true,
      allowUtensils: true,
      unpackUtensils: true,
    },
    adjunct: {
      allowItems: true,
      allowUtensils: true,
      unpackUtensils: true,
    },
    cutting_table: {
      allowItems: true,
      allowUtensils: false,
      unpackUtensils: true,
    },
    oven: {
      allowItems: false,
      allowUtensils: true,
      unpackUtensils: false,
    },
  },
  difficulties: {
    easy: {
      orderMinInterval: 5,
      orderMaxInterval: 15,
      orderMinTime: 90,
      orderMaxTime: 120,
    },
    medium: {
      orderMinInterval: 5,
      orderMaxInterval: 10,
      orderMinTime: 60,
      orderMaxTime: 90,
    },
    hard: {
      orderMinInterval: 1,
      orderMaxInterval: 5,
      orderMinTime: 45,
      orderMaxTime: 60,
    },
    intense: {
      orderMinInterval: 1,
      orderMaxInterval: 1,
      orderMinTime: 35,
      orderMaxTime: 45,
    },
  },
}