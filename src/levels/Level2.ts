import { repeatLine } from '@utilities/repeatLine';
import { repeatTile } from '@utilities/repeatTile';
import { BaseIngredients } from '@mytypes/Ingredient';
import type { Level } from '@mytypes/Level';
import type { MovableObject } from '@mytypes/MovableObject';
import type { PlatformState } from '@mytypes/PlatformState';
import type { WallState } from '@mytypes/WallState';
import { utensilToString } from '@utilities/utensilToString';

export const Level2: Level = {
  durationSeconds: 10 * 60,
  stars: true,
  lightColor: 'rgb(210, 225, 255)',
  spawn: [
    { x: -4, y: 0, z: 2 },
    { x: 0, y: 0, z: 2 },
    { x: 4, y: 0, z: 2 },
    { x: -4, y: 0, z: 6 },
    { x: 0, y: 0, z: 6 },
    { x: 4, y: 0, z: 6 }
  ],
  panda: { position: { x: 29.25, y: 0.1, z: 0.75 }, rotation: { x: 0, y: -45, z: 0 } },
  walls: [],
  platforms: [
    {
      type: 'platform_1x1_empty',
      dynamic: true,
      collider: {
        boundingBox: { x: 2.3125, y: 2, z: 2.3125 },
        ground: true,
      },
      speed: 800,
      pause: 200,
      path: [
        { point: { x: 11.5, y: -0.325, z: 7.625 } },
        { point: { x: 18.5, y: -0.325, z: 7.625 } },
        { point: { x: 18.5, y: -0.325, z: 0.8125 } },
        { point: { x: 11.5, y: -0.325, z: 0.8125 } },
      ],
    },
    {
      type: 'platform_1x1_empty',
      dynamic: true,
      collider: {
        boundingBox: { x: 2.3125, y: 2, z: 2.3125 },
        ground: true,
      },
      speed: 800,
      pause: 200,
      path: [
        { point: { x: 18.5, y: -0.325, z: 0.8125 } },
        { point: { x: 11.5, y: -0.325, z: 0.8125 } },
        { point: { x: 11.5, y: -0.325, z: 7.625 } },
        { point: { x: 18.5, y: -0.325, z: 7.625 } },
      ],
    },
    {
      type: 'platform_1x1_empty',
      dynamic: true,
      collider: {
        boundingBox: { x: 2.3125, y: 2, z: 2.3125 },
        ground: true,
      },
      speed: 800,
      pause: 200,
      path: [
        { point: { x: -7.75, y: -0.325, z: -11.675 } },
        { point: { x: -7.75, y: -0.325, z: -22.5 } },
        { point: { x: -1.1875, y: -0.325, z: -22.5 } },
        { point: { x: -1.1875, y: -0.325, z: -11.675 } },
      ],
    },
    {
      type: 'platform_1x1_empty',
      dynamic: true,
      collider: {
        boundingBox: { x: 2.3125, y: 2, z: 2.3125 },
        ground: true,
      },
      speed: 800,
      pause: 200,
      path: [
        { point: { x: -1.1875, y: -0.325, z: -22.5 } },
        { point: { x: -1.1875, y: -0.325, z: -11.675 } },
        { point: { x: -7.75, y: -0.325, z: -11.675 } },
        { point: { x: -7.75, y: -0.325, z: -22.5 } },
      ],
    },
    { type: 'platform_4x4', dynamic: false, position: { x: 0, y: 0, z: 0 } },
    { type: 'platform_2x2', dynamic: false, position: { x: 25.875, y: 0, z: 4.1875 }, rotation: { x: 0, y: 90, z: 0 } },
    { type: 'platform_2x2', dynamic: false, position: { x: -4.4375, y: 0, z: -30 }, rotation: { x: 0, y: 90, z: 0 } },
  ],
  workstations: [
    { id: 'lv2_workstation_1', type: 'adjunct', size: 4, dynamic: false, position: { x: 2.6875, y: 0, z: -9 } },
    { id: 'lv2_workstation_2', type: 'cutting_table', size: 1, dynamic: false, counterType: 'space_counter_straight', position: { x: 4.6875, y: 0, z: -9 } },
    { id: 'lv2_workstation_3', type: 'adjunct', size: 4, dynamic: false, position: { x: 6.6875, y: 0, z: -9 } },
    { id: 'lv2_workstation_4', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_corner', disabled: true, position: { x: 8.6875, y: 0, z: -9 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv2_workstation_5', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_end', disabled: true, position: { x: 0.6875, y: 0, z: -9 }, rotation: { x: 0, y: -180, z: 0} },
    { id: 'lv2_workstation_6', type: 'adjunct', size: 4, dynamic: false, position: { x: 8.6875, y: 0, z: -7 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv2_workstation_7', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_straight', position: { x: 8.6875, y: 0, z: -5 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv2_workstation_8', type: 'adjunct', size: 4, dynamic: false, position: { x: 8.6875, y: 0, z: -3 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv2_workstation_9', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_end', disabled: true, position: { x: 8.6875, y: 0, z: -1 }, rotation: { x: 0, y: 270, z: 0} },
    { id: 'lv2_workstation_10', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_end', disabled: true, position: { x: -8.8875, y: 0, z: 10.0625 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv2_workstation_11', type: 'adjunct', size: 4, dynamic: false, position: { x: -8.8875, y: 0, z: 4.0625 }, rotation: { x: 0, y: 90, z: 0 }, child: 'utensil', item: utensilToString({ type: 'pan', size: 4, content: [] }) },
    { id: 'lv2_workstation_12', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_drawers', position: { x: -8.8875, y: 0, z: 6.0625 }, rotation: { x: 0, y: 90, z: 0 }, child: 'utensil', item: utensilToString({ type: 'pot_1', size: 4, content: [] }) },
    { id: 'lv2_workstation_13', type: 'adjunct', size: 4, dynamic: false, position: { x: -8.8875, y: 0, z: 8.0625 }, rotation: { x: 0, y: 90, z: 0 }, child: 'utensil', item: utensilToString({ type: 'pot_2', size: 4, content: [] }) },
    { id: 'lv2_workstation_14', type: 'adjunct', size: 4, dynamic: false, position: { x: -8.8875, y: 0, z: 0.0625 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv2_workstation_15', type: 'chukaman_steamer', size: 4, dynamic: false, counterType: 'space_counter_straight', position: { x: -8.8875, y: 0, z: 2.0625 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv2_workstation_16', type: 'adjunct', size: 4, dynamic: false, position: { x: -8.8875, y: 0, z: 4.0625 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv2_workstation_17', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_end', disabled: true, position: { x: -8.8875, y: 0, z: -1.8875 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv2_workstation_18', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_end', disabled: true, position: { x: -1.5625, y: 0, z: -34.25 } },
    { id: 'lv2_workstation_19', type: 'oven', size: 1, dynamic: false, position: { x: -4.625, y: 0, z: -34.25 } },
    { id: 'lv2_workstation_20', type: 'oven', size: 1, dynamic: false, position: { x: -6.1875, y: 0, z: -34.25 } },
    { id: 'lv2_workstation_21', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_corner', disabled: true, position: { x: -8.9375, y: 0, z: -34.25 } },
    { id: 'lv2_workstation_22', type: 'adjunct', size: 4, dynamic: false, position: { x: -8.9375, y: 0, z: -29.25 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv2_workstation_23', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_straight', position: { x: -8.9375, y: 0, z: -31.25 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv2_workstation_24', type: 'counter', size: 4, dynamic: false, counterType: 'space_counter_end', disabled: true, position: { x: -8.9375, y: 0, z: -27.25 }, rotation: { x: 0, y: -90, z: 0 } },
  ],
  supplies: [ { type: 'fridge', dynamic: false, position: { x: -0.9375, y: 0.2, z: -34.25 }, collider: { boundingBox: { x: 1.25, y: 2.75, z: 1.25 }, offset: { x: 0, y: 1.375, z: 0 } }, content: BaseIngredients } ],
  decorations: [],
  colliders: [
    { boundingBox: { x: 9.5, y: 10, z: 9.5 }, position: { x: 0, y: 0, z: 0 }, ground: true },
    { boundingBox: { x: 5.3125, y: 10, z: 5.3125 }, position: { x: -4.5, y: 0, z: -30 }, ground: true },
    { boundingBox: { x: 5.3125, y: 10, z: 5.3125 }, position: { x: 25.8125, y: 0, z: 4.1875 }, ground: true },
    { boundingBox: { x: 0.875, y: 10, z: 5.3125 }, position: { x: -8.8875, y: 0, z: 4 } },
    { boundingBox: { x: 4.1875, y: 10, z: 0.875 }, position: { x: 5.3125, y: 0, z: -9 } },
    { boundingBox: { x: 0.9375, y: 10, z: 4.1875 }, position: { x: 8.75, y: 0, z: -5.625 } },
    { boundingBox: { x: 0.9375, y: 10, z: 3.625 }, position: { x: -8.8875, y: 0, z: -31.3125 } },
    { boundingBox: { x: 5.5, y: 10, z: 0.875 }, position: { x: -4.5, y: 0, z: -34 } },

    { boundingBox: { x: 1, y: 10, z: 25 }, position: { x: -10.5, y: 0, z: -12.5 } },
    { boundingBox: { x: 1, y: 10, z: 15 }, position: { x: 2, y: 0, z: -25 } },
    { boundingBox: { x: 5, y: 10, z: 1 }, position: { x: -5, y: 0, z: -36 } },

    { boundingBox: { x: 25, y: 10, z: 1 }, position: { x: 12.5, y: 0, z: 10.5 } },
    { boundingBox: { x: 15, y: 10, z: 1 }, position: { x: 23, y: 0, z: -2.5 } },
    { boundingBox: { x: 1, y: 10, z: 15 }, position: { x: 32, y: 0, z: 0 } },

    { boundingBox: { x: 4, y: 10, z: 1 }, position: { x: 5, y: 0, z: -10 } },
    { boundingBox: { x: 1, y: 10, z: 4 }, position: { x: 10, y: 0, z: -5.5 } },
  ],
}