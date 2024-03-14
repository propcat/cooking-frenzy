import { repeatLine } from '@utilities/repeatLine';
import { repeatTile } from '@utilities/repeatTile';
import { BaseIngredients } from '@mytypes/Ingredient';
import type { Level } from '@mytypes/Level';
import type { MovableObject } from '@mytypes/MovableObject';
import type { PlatformState } from '@mytypes/PlatformState';
import type { WallState } from '@mytypes/WallState';
import { utensilToString } from '@utilities/utensilToString';
import { WorkstationState } from '@mytypes/WorkstationState';

type Wall = WallState & MovableObject;
type Platform = PlatformState & MovableObject;

export const Level3: Level = {
  durationSeconds: 10 * 60,
  stars: false,
  lightColor: 'rgb(230, 230, 255)',
  spawn: [
    { x: -5.5, y: 0, z: 22 },
    { x: -9.5, y: 0, z: 22 },
    { x: -5.5, y: 0, z: 26 },
    { x: -9.5, y: 0, z: 26 },
    { x: -5.5, y: 0, z: 30 },
    { x: -9.5, y: 0, z: 30 }
  ],
  panda: { position: { x: -19, y: 0.1, z: 20 }, rotation: { x: 0, y: 30, z: 0 } },
  walls: [
    ...repeatLine({ length: 5, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 16, y, z: z + 18.5 }, rotation: { x: 0, y: -90, z: 0 } })),
    ...repeatLine({ length: 5, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 16, y: y + 9, z: z + 18.5 }, rotation: { x: 0, y: -90, z: 180 } })),
    ...repeatLine({ length: 5, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 16, y: y + 9, z: z + 18.5 }, rotation: { x: 0, y: -90, z: 0 } })),
  
    { type: 'wall_normal', dynamic: false, position: { x: -20, y: 0, z: 18.5 }, rotation: { x: 0, y: 90, z: 0 } },
    { type: 'wall_door', dynamic: false, position: { x: -20, y: 0, z: 22.5 }, rotation: { x: 0, y: 90, z: 0 } },
    { type: 'wall_door', dynamic: false, position: { x: -20, y: 0, z: 26.5 }, rotation: { x: 0, y: 90, z: 0 } },
    ...repeatLine({ length: 2, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x - 20, y, z: z + 30.5 }, rotation: { x: 0, y: 90, z: 0 } })),
    ...repeatLine({ length: 5, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x - 20, y: y + 9, z: z + 18.5 }, rotation: { x: 0, y: 90, z: 180 } })),
    ...repeatLine({ length: 5, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x - 20, y: y + 9, z: z + 18.5 }, rotation: { x: 0, y: 90, z: 0 } })),
    
    ...repeatLine({ length: 10, offset: 4, axis: 'x' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal_opaque', dynamic: false, position: { x: x - 20, y, z: z + 18.5 } })),
    ...repeatLine({ length: 10, offset: 4, axis: 'x' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal_opaque', dynamic: false, position: { x: x - 20, y: y + 9, z: z + 18.5 }, rotation: { x: 0, y: 0, z: 180 } })),
    ...repeatLine({ length: 10, offset: 4, axis: 'x' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal_opaque', dynamic: false, position: { x: x - 20, y: y + 9, z: z + 18.5 } })),
  ],
  platforms: [
    { type: 'street_straight', dynamic: false, position: { x: -50, y: -4, z: 0 } },
    { type: 'street_straight', dynamic: false, position: { x: 0, y: -4, z: 0 } },
    { type: 'street_straight', dynamic: false, position: { x: 50, y: -4, z: 0 } },

    { type: 'street_straight', dynamic: false, position: { x: -50, y: -4, z: 50 } },
    { type: 'street_straight', dynamic: false, position: { x: 0, y: -4, z: 50 } },
    { type: 'street_straight', dynamic: false, position: { x: 50, y: -4, z: 50 } },

    ...repeatTile({ size: 5, offset: 4 }).map<Platform>(({ x, y, z }) => ({ type: 'floor_wood', dynamic: false, position: { x, y, z: z + 18.5 } })),
    ...repeatTile({ size: 5, offset: 4 }).map<Platform>(({ x, y, z }) => ({ type: 'floor_wood', dynamic: false, position: { x: x - 20, y, z: z + 18.5 } })),
  ],
  workstations: [
    {
      id: `lv3_workstation_1`,
      type: 'counter',
      counterType: 'counter_end',
      size: 4,
      disabled: true,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 16 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 21.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 0.375 },
        offset: { x: 0, y: 0, z: 1.125 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_2`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 18 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 23.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_3`,
      type: 'cutting_table',
      counterType: 'counter_straight',
      size: 1,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 20 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 25.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_4`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 22 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 27.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_5`,
      type: 'counter',
      counterType: 'counter_drawers',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 24 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 29.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_6`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 26 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 31.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_7`,
      type: 'cutting_table',
      counterType: 'counter_straight',
      size: 1,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 28 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 33.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_8`,
      type: 'cutting_table',
      counterType: 'counter_straight',
      size: 1,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 28 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 33.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_9`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 30 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 7, y: 0, z: 35.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_10`,
      type: 'counter',
      counterType: 'counter_end',
      size: 4,
      disabled: true,
      dynamic: true,
      path: [
        { point: { x: 7, y: 0, z: 32 }, rotation: { x: 0, y: -90, z: 0 } },
        { point: { x: 7, y: 0, z: 37.0625 }, rotation: { x: 0, y: -90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 0.375 },
        offset: { x: 0, y: 0, z: -1.125 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },

    {
      id: `lv3_workstation_11`,
      type: 'counter',
      counterType: 'counter_end',
      size: 4,
      disabled: true,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 21.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 16 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 0.375 },
        offset: { x: 0, y: 0, z: 1.125 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_12`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 23.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 18 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_13`,
      type: 'counter',
      counterType: 'counter_straight',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 25.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 20 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
      child: 'utensil',
      item: utensilToString({ type: 'pan', size: 4, content: [] }),
    },
    {
      id: `lv3_workstation_14`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 27.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 22 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_15`,
      type: 'counter',
      counterType: 'counter_doors',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 29.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 24 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
      child: 'utensil',
      item: utensilToString({ type: 'pot_1', size: 4, content: [] }),
    },
    {
      id: `lv3_workstation_16`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 31.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 26 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_17`,
      type: 'counter',
      counterType: 'counter_straight',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 33.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 28 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
      child: 'utensil',
      item: utensilToString({ type: 'pot_2', size: 4, content: [] }),
    },
    {
      id: `lv3_workstation_18`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 35.0625 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -3, y: 0, z: 30 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_19`,
      type: 'counter',
      counterType: 'counter_end',
      size: 4,
      disabled: true,
      dynamic: true,
      path: [
        { point: { x: -3, y: 0, z: 37.0625 }, rotation: { x: 0, y: -90, z: 0 } },
        { point: { x: -3, y: 0, z: 32 }, rotation: { x: 0, y: -90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 0.375 },
        offset: { x: 0, y: 0, z: -1.125 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_20`,
      type: 'counter',
      counterType: 'counter_end',
      size: 4,
      disabled: true,
      dynamic: true,
      path: [
        { point: { x: -13, y: 0, z: 16 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13, y: 0, z: 21.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 0.375 },
        offset: { x: 0, y: 0, z: 1.125 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_21`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -13, y: 0, z: 18 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13, y: 0, z: 23.0625  }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_22`,
      type: 'counter',
      counterType: 'counter_straight',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -13, y: 0, z: 20 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13, y: 0, z: 25.0625  }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_23`,
      type: 'oven',
      size: 1,
      dynamic: true,
      path: [
        { point: { x: -13.125, y: 0, z: 22 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13.125, y: 0, z: 27.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_24`,
      type: 'oven',
      size: 1,
      dynamic: true,
      path: [
        { point: { x: -13.125, y: 0, z: 24 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13.125, y: 0, z: 29.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_25`,
      type: 'oven',
      size: 1,
      dynamic: true,
      path: [
        { point: { x: -13.125, y: 0, z: 26 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13.125, y: 0, z: 31.0625 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_26`,
      type: 'chukaman_steamer',
      counterType: 'counter_straight',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -13, y: 0, z: 28 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13, y: 0, z: 33.0625  }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_27`,
      type: 'adjunct',
      size: 4,
      dynamic: true,
      path: [
        { point: { x: -13, y: 0, z: 30 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: -13, y: 0, z: 35.0625  }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 2 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
    {
      id: `lv3_workstation_28`,
      type: 'counter',
      counterType: 'counter_end',
      size: 4,
      disabled: true,
      dynamic: true,
      path: [
        { point: { x: -13, y: 0, z: 32 }, rotation: { x: 0, y: -90, z: 0 } },
        { point: { x: -13, y: 0, z: 37.0625 }, rotation: { x: 0, y: -90, z: 0 } },
      ],
      collider: {
        boundingBox: { x: 0.875, y: 2, z: 0.375 },
        offset: { x: 0, y: 0, z: 1.125 },
      },
      speed: 2.5 * 1000,
      pause: 10 * 1000,
    },
  ],
  supplies: [ { type: 'fridge', dynamic: false, position: { x: 16.25, y: 0.2, z: 18.5 }, rotation: { x: 0, y: -30, z: 0 }, collider: { boundingBox: { x: 1.25, y: 2.75, z: 1.25 }, offset: { x: 0, y: 1.375, z: 0 } }, content: BaseIngredients } ],
  decorations: [
    {
      type: 'blue_car',
      dynamic: true,
      path: [
        { point: { x: -70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
      ],
      speed: 4 * 1000,
    },
    {
      type: 'red_car',
      dynamic: true,
      path: [
        { point: { x: 70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      speed: 4 * 1000,
    },
    {
      type: 'taxi',
      dynamic: true,
      path: [
        { point: { x: 70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      speed: 4 * 1000,
    },
    {
      type: 'purple_car',
      dynamic: true,
      path: [
        { point: { x: -70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 70, y: -1, z: 4 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 70, y: -1, z: 46 }, rotation: { x: 0, y: 270, z: 0 } },
      ],
      speed: 4 * 1000,
    },

    {
      type: 'white_car',
      dynamic: true,
      path: [
        { point: { x: 100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      speed: 6 * 1000,
    },
    {
      type: 'taxi',
      dynamic: true,
      path: [
        { point: { x: -100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
      ],
      speed: 6 * 1000,
    },
    {
      type: 'green_car',
      dynamic: true,
      path: [
        { point: { x: -100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
      ],
      speed: 6 * 1000,
    },
    {
      type: 'mint_car',
      dynamic: true,
      path: [
        { point: { x: 100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
        { point: { x: 100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -100, y: -1, z: -4 }, rotation: { x: 0, y: 270, z: 0 } },
        { point: { x: -100, y: -1, z: 54 }, rotation: { x: 0, y: 90, z: 0 } },
      ],
      speed: 6 * 1000,
    },
    
    { type: 'three_story_balcony_mat', dynamic: false, position: { x: -44, y: -1, z: -25 } },
    { type: 'four_story_mat', dynamic: false, position: { x: -32, y: -1, z: -25 } },
    { type: 'three_story_slim_mat', dynamic: false, position: { x: -21, y: -1, z: -25 } },
    { type: 'three_story_balcony_mat', dynamic: false, position: { x: -12, y: -1, z: -25 } },
    { type: 'four_story_mat', dynamic: false, position: { x: 0, y: -1, z: -25 } },
    { type: 'six_story_stack_mat', dynamic: false, position: { x: 14, y: -1, z: -25 } },
    { type: 'three_story_slim_mat', dynamic: false, position: { x: 23, y: -1, z: -25 } },
    { type: 'four_story_mat', dynamic: false, position: { x: 32, y: -1, z: -25 } },
    { type: 'three_story_balcony_mat', dynamic: false, position: { x: 44, y: -1, z: -25 } },

    { type: 'four_story_mat', dynamic: false, position: { x: -30, y: -1, z: 30 }, rotation: { x: 0, y: 180, z: 0 } },
    { type: 'four_story_mat', dynamic: false, position: { x: 28, y: -1, z: 30 }, rotation: { x: 0, y: 180, z: 0 } },
  ],
  colliders: [
    { boundingBox: { x: 20.125, y: 10, z: 10 }, position: { x: -1.75, y: 0, z: 26.5 }, ground: true },

    { boundingBox: { x: 20.125, y: 10, z: 1 }, position: { x: -1.75, y: 0, z: 16 } },
    { boundingBox: { x: 20.125, y: 10, z: 1 }, position: { x: -1.75, y: 0, z: 37 } },

    { boundingBox: { x: 1, y: 10, z: 12 }, position: { x: -22, y: 0, z: 26 } },
    { boundingBox: { x: 1, y: 10, z: 12 }, position: { x: 18, y: 0, z: 26 } },
  ],
}