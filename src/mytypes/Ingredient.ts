export type Ingredient =
  'avocado'           |
  'crabsticks'        |
  'cucumber'          |
  'ebi'               |
  'eel'               |
  'fish'              |
  'fish_fillet'       |
  'flounder'          |
  'mackerel'          |
  'nori'              |
  'octopus'           |
  'rice'              |
  'salmon'            |
  'salmon_fish'       |
  'sea_urchin'        |
  'sea_urchin_open'   |
  'shimesaba'         |
  'sliced_cucumber'   |
  'squid'             |
  'tentacle'          |
  'wasabi'            |
  'tuna';

export const BaseIngredients: Ingredient[] = [
  'avocado',
  'crabsticks',
  'cucumber',
  'ebi',
  'eel',
  'fish',
  'flounder',
  'mackerel',
  'nori',
  'octopus',
  'rice',
  'salmon_fish',
  'sea_urchin',
  'shimesaba',
  //'squid',
  'wasabi',
  'tuna',
]

export const ProcessedIngredients: Ingredient[] = [
  'sliced_cucumber',
  'fish_fillet',
  'salmon',
  'sea_urchin_open',
  'tentacle',
]