import type { Recipe } from '@mytypes/Recipe';

const PREPARE_INGREDIENT_TIME = 3;
const COOK_MANUAL_TIME = 6;
const COOK_AUTOMATIC_TIME = 10;

export const recipes: Recipe[] = [

  /* Ingredient -> Ingredient */

  {
    type: 'process',
    ingredients: ['cucumber'],
    workstation: 'cutting_table',
    result: 'sliced_cucumber',
    time: PREPARE_INGREDIENT_TIME,
  },
  
  {
    type: 'process',
    ingredients: ['fish'],
    workstation: 'cutting_table',
    result: 'fish_fillet',
    time: PREPARE_INGREDIENT_TIME,
  },

  {
    type: 'process',
    ingredients: ['salmon_fish'],
    workstation: 'cutting_table',
    result: 'salmon',
    time: PREPARE_INGREDIENT_TIME,
  },

  {
    type: 'process',
    ingredients: ['sea_urchin'],
    workstation: 'cutting_table',
    result: 'sea_urchin_open',
    time: PREPARE_INGREDIENT_TIME,
  },

  {
    type: 'process',
    ingredients: ['octopus'],
    workstation: 'cutting_table',
    result: 'tentacle',
    time: PREPARE_INGREDIENT_TIME,
  },

  /* Ingredient -> Food */

  {
    type: 'cook',
    ingredients: ['rice', 'eel', 'sliced_cucumber'],
    workstation: 'chukaman_steamer',
    result: 'chukaman',
    time: COOK_AUTOMATIC_TIME,
  },
  
  /*{
    ingredients: ['rice'],
    result: 'dango',
  },*/

  {
    type: 'assembly',
    ingredients: ['rice', 'ebi', 'wasabi'],
    result: 'ebi_nigiri',
  },

  {
    type: 'cook',
    ingredients: ['crabsticks', 'shimesaba', 'sliced_cucumber'],
    workstation: 'oven',
    utensil: 'pan',
    result: 'gyoza',
    time: COOK_AUTOMATIC_TIME,
  },
  
  {
    type: 'assembly',
    ingredients: ['rice', 'tuna', 'wasabi'],
    result: 'maguro_nigiri',
  },

  {
    type: 'assembly',
    ingredients: ['rice', 'tentacle', 'nori'],
    result: 'octopus_nigiri',
  },

  {
    type: 'cook',
    ingredients: ['rice', 'mackerel', 'sliced_cucumber'],
    workstation: 'oven',
    utensil: 'pot_1',
    result: 'ramen',
    time: COOK_AUTOMATIC_TIME,
  },

  {
    type: 'cook',
    ingredients: ['rice', 'mackerel', 'sliced_cucumber'],
    workstation: 'oven',
    utensil: 'pot_2',
    result: 'ramen',
    time: COOK_AUTOMATIC_TIME,
  },

  {
    type: 'assembly',
    ingredients: ['rice', 'flounder', 'avocado', 'nori'],
    result: 'roll',
  },

  {
    type: 'assembly',
    ingredients: ['rice', 'salmon', 'wasabi'],
    result: 'salmon_nigiri',
  },

  {
    type: 'assembly',
    ingredients: ['rice', 'salmon', 'eel', 'nori'],
    result: 'salmon_roll',
  },

  {
    type: 'assembly',
    ingredients: ['rice', 'sea_urchin_open', 'nori'],
    result: 'sea_urchin_roll',
  },

  {
    type: 'cook',
    ingredients: ['rice', 'sliced_cucumber', 'nori'],
    workstation: 'oven',
    utensil: 'pot_1',
    result: 'udon',
    time: COOK_AUTOMATIC_TIME,
  },

  {
    type: 'cook',
    ingredients: ['rice', 'sliced_cucumber', 'nori'],
    workstation: 'oven',
    utensil: 'pot_2',
    result: 'udon',
    time: COOK_AUTOMATIC_TIME,
  },
]