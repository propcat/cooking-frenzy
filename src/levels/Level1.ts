import { repeatLine } from '@utilities/repeatLine';
import { repeatTile } from '@utilities/repeatTile';
import { BaseIngredients } from '@mytypes/Ingredient';
import type { Level } from '@mytypes/Level';
import type { MovableObject } from '@mytypes/MovableObject';
import type { PlatformState } from '@mytypes/PlatformState';
import type { WallState } from '@mytypes/WallState';
import { utensilToString } from '@utilities/utensilToString';

type Wall = WallState & MovableObject;
type Platform = PlatformState & MovableObject;

export const Level1: Level = {
  durationSeconds: 10 * 60,
  stars: false,
  lightColor: 'rgb(255, 210, 200)',
  spawn: [
    { x: 6, y: 0, z: 6 },
    { x: 10, y: 0, z: 6 },
    { x: 14, y: 0, z: 6 },
    { x: 6, y: 0, z: 10 },
    { x: 10, y: 0, z: 10 },
    { x: 14, y: 0, z: 10 }
  ],
  panda: { position: { x: 26, y: 0.1, z: 3 }, rotation: { x: 0, y: 315, z: 0 } },
  walls: [
    ...repeatLine({ length: 5, offset: 4, axis: 'x' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x, y, z } })),
    { type: 'wall_door', dynamic: false, position: { x: 20, y: 0, z: 0 } },
    { type: 'wall_door', dynamic: false, position: { x: 24, y: 0, z: 0 } },
    { type: 'wall_normal', dynamic: false, position: { x: 28, y: 0, z: 0 } },
    ...repeatLine({ length: 8, offset: 4, axis: 'x' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x, y: y + 9, z } })),
    ...repeatLine({ length: 8, offset: 4, axis: 'x' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x, y: y + 9, z }, rotation: { x: 0, y: 0, z: 180 } })),

    ...repeatLine({ length: 8, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 0.475, y, z }, rotation: { x: 0, y: 90, z: 0 } })),
    ...repeatLine({ length: 8, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 0.475, y: y + 9, z }, rotation: { x: 0, y: 90, z: 0 } })),
    ...repeatLine({ length: 8, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 0.475, y: y + 9, z }, rotation: { x: 0, y: 90, z: 180 } })),

    ...repeatLine({ length: 8, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 27.525, y, z }, rotation: { x: 0, y: 270, z: 0 } })),
    ...repeatLine({ length: 8, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 27.525, y: y + 9, z }, rotation: { x: 0, y: 270, z: 0 } })),
    ...repeatLine({ length: 8, offset: 4, axis: 'z' }).map<Wall>(({ x, y, z }) => ({ type: 'wall_normal', dynamic: false, position: { x: x + 27.525, y: y + 9, z }, rotation: { x: 0, y: 270, z: 180 } })),
  ],
  platforms: [
    ...repeatTile({ size: 8, offset: 4 }).map<Platform>(({ x, y, z }) => ({ type: 'floor_wood', dynamic: false, position: { x, y, z } })),
    // { type: 'floor_wood', dynamic: true, path: [{ point: { x: 6, y: 0, z: 32 } }, { point: { x: 12, y: 0, z: 32 } }], collider: { boundingBox: { x: 2, y: 10, z: 2 }, offset: { x: 0, y: 4.5, z: 0 }, ground: true } },
  ],
  workstations: [
    { id: 'lv1_workstation_1', type: 'counter', size: 4, dynamic: false, counterType: 'counter_corner', disabled: true, position: { x: -0.625, y: 0, z: -1 } },
    { id: 'lv1_workstation_2', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', disabled: true, position: { x: 0, y: 0, z: -1 } },
    { id: 'lv1_workstation_3', type: 'adjunct', size: 4, dynamic: false, position: { x: 2, y: 0, z: -1 } },
    { id: 'lv1_workstation_4', type: 'cutting_table', size: 1, dynamic: false, counterType: 'counter_drawers', position: { x: 4, y: 0, z: -1 } },
    { id: 'lv1_workstation_5', type: 'adjunct', size: 4, dynamic: false, position: { x: 6, y: 0, z: -1 } },
    { id: 'lv1_workstation_6', type: 'counter', size: 4, dynamic: false, counterType: 'counter_sink', disabled: true, position: { x: 8, y: 0, z: -1 } },
    { id: 'lv1_workstation_7', type: 'adjunct', size: 4, dynamic: false, position: { x: 10, y: 0, z: -1 } },
    { id: 'lv1_workstation_8', type: 'cutting_table', size: 1, dynamic: false, counterType: 'counter_drawers', position: { x: 12, y: 0, z: -1 } },
    { id: 'lv1_workstation_9', type: 'adjunct', size: 4, dynamic: false, position: { x: 14, y: 0, z: -1 } },
    { id: 'lv1_workstation_10', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: 16, y: 0, z: -1 } },

    { id: 'lv1_workstation_11', type: 'adjunct', size: 4, dynamic: false, position: { x: -0.625, y: 0, z: 1 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_12', type: 'counter', size: 4, dynamic: false, counterType: 'counter_drawers', position: { x: -0.625, y: 0, z: 3 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_13', type: 'adjunct', size: 4, dynamic: false, position: { x: -0.625, y: 0, z: 5 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_14', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', position: { x: -0.625, y: 0, z: 7 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_15', type: 'adjunct', size: 4, dynamic: false, position: { x: -0.625, y: 0, z: 9 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_16', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', position: { x: -0.625, y: 0, z: 11 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_17', type: 'adjunct', size: 4, dynamic: false, position: { x: -0.625, y: 0, z: 13 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_18', type: 'counter', size: 4, dynamic: false, counterType: 'counter_drawers', position: { x: -0.625, y: 0, z: 15 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_19', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: -0.625, y: 0, z: 19 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv1_workstation_20', type: 'oven', size: 1, dynamic: false, position: { x: -0.675, y: 0, z: 19 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_21', type: 'oven', size: 1, dynamic: false, position: { x: -0.675, y: 0, z: 21 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_22', type: 'oven', size: 1, dynamic: false, position: { x: -0.675, y: 0, z: 23 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_23', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: -0.625, y: 0, z: 23.5 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_24', type: 'adjunct', size: 4, dynamic: false, position: { x: -0.625, y: 0, z: 25 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_25', type: 'counter', size: 4, dynamic: false, counterType: 'counter_drawers', position: { x: -0.625, y: 0, z: 27 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_26', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: -0.625, y: 0, z: 30.625 }, rotation: { x: 0, y: 270, z: 0 } },
    
    { id: 'lv1_workstation_27', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: 14.625, y: 0, z: 15 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_28', type: 'adjunct', size: 4, dynamic: false, position: { x: 14.625, y: 0, z: 17 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_29', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', child: 'utensil', item: utensilToString({ type: 'pan', size: 4, content: [] }), position: { x: 14.625, y: 0, z: 19 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_30', type: 'adjunct', size: 4, dynamic: false, position: { x: 14.625, y: 0, z: 21 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_31', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', child: 'utensil', item: utensilToString({ type: 'pot_1', size: 4, content: [] }), position: { x: 14.625, y: 0, z: 23 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_32', type: 'adjunct', size: 4, dynamic: false, position: { x: 14.625, y: 0, z: 25 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_33', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', child: 'utensil', item: utensilToString({ type: 'pot_2', size: 4, content: [] }), position: { x: 14.625, y: 0, z: 27 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_34', type: 'adjunct', size: 4, dynamic: false, position: { x: 14.625, y: 0, z: 29 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_35', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: 14.625, y: 0, z: 30.75 }, rotation: { x: 0, y: 270, z: 0 } },
  
    { id: 'lv1_workstation_36', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: 28.5, y: 0, z: 15 }, rotation: { x: 0, y: 90, z: 0 } },
    { id: 'lv1_workstation_37', type: 'counter', size: 4, dynamic: false, counterType: 'counter_straight', position: { x: 28.5, y: 0, z: 19 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv1_workstation_38', type: 'adjunct', size: 4, dynamic: false, position: { x: 28.5, y: 0, z: 21 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv1_workstation_39', type: 'counter', size: 4, dynamic: false, counterType: 'counter_drawers', position: { x: 28.5, y: 0, z: 23 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv1_workstation_40', type: 'adjunct', size: 4, dynamic: false, position: { x: 28.5, y: 0, z: 25 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv1_workstation_41', type: 'chukaman_steamer', size: 4, dynamic: false, counterType: 'counter_straight', position: { x: 28.5, y: 0, z: 27 }, rotation: { x: 0, y: 270, z: 0 } },
    { id: 'lv1_workstation_42', type: 'counter', size: 4, dynamic: false, counterType: 'counter_end', disabled: true, position: { x: 28.5, y: 0, z: 30.75 }, rotation: { x: 0, y: 270, z: 0 } },
  ],
  supplies: [ { type: 'fridge', dynamic: false, position: { x: 28.5, y: 0.2, z: 14.25}, rotation: { x: 0, y: 270, z: 0 }, collider: { boundingBox: { x: 1.25, y: 2.75, z: 1.25 }, offset: { x: 0, y: 1.375, z: 0 } }, content: BaseIngredients } ],
  decorations: [
    { type: 'bamboo', dynamic: false, position: { x: 16.5, y: 0, z: -0.75 }, scale: 1.25 },
    { type: 'fish', dynamic: false, position: { x: 7.5, y: 2.75, z: -1.5 } },
    { type: 'painting_small', dynamic: false, position: { x: 27.75, y: 2.75, z: -2 } },
    { type: 'plant_1', dynamic: false, position: { x: 28.5, y: 2, z: 17 } },
    { type: 'plant_2', dynamic: false, position: { x: 28.5, y: 0, z: 11 }, scale: 2 },
    { type: 'plant_1', dynamic: false, position: { x: -0.5, y: 2, z: -0.5 } },
    { type: 'knives', dynamic: false, position: { x: 28.5, y: 2, z: 29 }, rotation: { x: 0, y: 270, z: 0 } },
    { type: 'bottles', dynamic: false, position: { x: -0.5, y: 2, z: 29 } },
    { type: 'sign_1', dynamic: false, position: { x: 22, y: 6, z: -1.95 } },
    { type: 'knives', dynamic: false, position: { x: -0.5, y: 2, z: 16.5 }, rotation: { x: 0, y: 90, z: 0 } },

    { type: 'cabinet_corner', dynamic: false, position: { x: -0.25, y: 4.5, z: -0.75 }, scale: { x: 1, y: 0.9, z: 1 } },
    { type: 'cabinet_doors', dynamic: false, position: { x: 1.5, y: 4.5, z: -0.75 } },
    { type: 'cabinet_shelves_2', dynamic: false, position: { x: 5.5, y: 4.5, z: -0.75 } },
    { type: 'cabinet_doors', dynamic: false, position: { x: 9.5, y: 4.5, z: -0.75 } },
    { type: 'cabinet_shelves_1', dynamic: false, position: { x: 13.5, y: 4.5, z: -0.75 } },
  ],
  colliders: [
    { boundingBox: { x: 15.5, y: 10, z: 16 }, position: { x: 14, y: 0, z: 14 }, ground: true },

    { boundingBox: { x: 1, y: 1, z: 16 }, position: { x: -0.675, y: 1, z: 14.125 } },
    { boundingBox: { x: 8.5, y: 1, z: 1 }, position: { x: 7, y: 1, z: -0.875 } },
    { boundingBox: { x: 0.875, y: 1, z: 7.3125 }, position: { x: 14.625, y: 1, z: 22.9375 } },
    { boundingBox: { x: 0.875, y: 1, z: 7.3125 }, position: { x: 28.5, y: 1, z: 22.9375 } },

    { boundingBox: { x: 0.25, y: 10, z: 16 }, position: { x: -2, y: 5, z: 14 } },
    { boundingBox: { x: 16, y: 10, z: 0.25 }, position: { x: 14, y: 5, z: -2 } },
    { boundingBox: { x: 0.25, y: 10, z: 16 }, position: { x: 30, y: 5, z: 14 } },
    { boundingBox: { x: 16, y: 10, z: 0.25 }, position: { x: 14, y: 5, z: 30 } },
  ],
}