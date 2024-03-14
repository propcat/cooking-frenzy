import { forwardRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import { Group } from 'three';
import { Avocado } from '@models/ingredient/Avocado';
import { Crabsticks } from '@models/ingredient/Crabsticks';
import { Cucumber } from '@models/ingredient/Cucumber';
import { Ebi } from '@models/ingredient/Ebi';
import { Eel } from '@models/ingredient/Eel';
import { Fish } from '@models/ingredient/Fish';
import { FishFillet } from '@models/ingredient/FishFillet';
import { Flounder } from '@models/ingredient/Flounder';
import { Mackerel } from '@models/ingredient/Mackerel';
import { Nori } from '@models/ingredient/Nori';
import { Octopus } from '@models/ingredient/Octopus';
import { Rice } from '@models/ingredient/Rice';
import { Salmon } from '@models/ingredient/Salmon';
import { SalmonFish } from '@models/ingredient/SalmonFish';
import { SeaUrchin } from '@models/ingredient/SeaUrchin';
import { SeaUrchinOpen } from '@models/ingredient/SeaUrchinOpen';
import { Shimesaba } from '@models/ingredient/Shimesaba';
import { SlicedCucumber } from '@models/ingredient/SlicedCucumber';
import { Squid } from '@models/ingredient/Squid';
import { Tentacle } from '@models/ingredient/Tentacle';
import { Tuna } from '@models/ingredient/Tuna';
import { Chukaman } from '@models/food/Chukaman';
import { EbiNigiri } from '@models/food/EbiNigiri';
import { Gyoza } from '@models/food/Gyoza';
import { MaguroNigiri } from '@models/food/MaguroNigiri';
import { OctopusNigiri } from '@models/food/OctopusNigiri';
import { Ramen } from '@models/food/Ramen';
import { Roll } from '@models/food/Roll';
import { SalmonNigiri } from '@models/food/SalmonNigiri';
import { SalmonRoll } from '@models/food/SalmonRoll';
import { SeaUrchinRoll } from '@models/food/SeaUrchinRoll';
import { Udon } from '@models/food/Udon';
import { Wasabi } from '@models/food/Wasabi';
import { UtensilProps } from '@models/utensil/UtensilProps';
import { degToRad } from 'three/src/math/MathUtils';
import { Pan } from '@models/utensil/Pan';
import { Pot1Empty } from '@models/utensil/Pot1Empty';
import { Pot2Empty } from '@models/utensil/Pot2Empty';
import { Pot1Filled } from '@models/utensil/Pot1Filled';
import { Pot2Filled } from '@models/utensil/Pot2Filled';
import { rotationToEuler } from '@utilities/rotationToEuler';

export const Counter = forwardRef<Group, GroupProps & UtensilProps>(({ item, outline, utensil, ...props }, ref) => {
  return (
    <group ref={ref} {...props} dispose={null}>
      {!utensil && item === 'avocado' && <Avocado outline={outline} position={[0, 2.1, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'crabsticks' && <Crabsticks outline={outline} position={[0, 2, 0]}/>}
      {!utensil && item === 'cucumber' && <Cucumber outline={outline} position={[0, 2.15, 0]}/>}
      {!utensil && item === 'ebi' && <Ebi outline={outline} position={[0, 2, 0]}/>}
      {!utensil && item === 'eel' && <Eel outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'fish' && <Fish outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'fish_fillet' && <FishFillet outline={outline} position={[0, 1.95, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'flounder' && <Flounder outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'mackerel' && <Mackerel outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'nori' && <Nori outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'octopus' && <Octopus outline={outline} position={[0, 2.85, 0]} rotation={rotationToEuler({ x: 320, y: 0, z: 0})}/>}
      {!utensil && item === 'rice' && <Rice outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'salmon' && <Salmon outline={outline} position={[0, 1.95, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'salmon_fish' && <SalmonFish outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'sea_urchin' && <SeaUrchin outline={outline} position={[0, 2.25, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'sea_urchin_open' && <SeaUrchinOpen outline={outline} position={[0, 2.3, 0]} rotation={rotationToEuler({ x: 300, y: 0, z: 0})}/>}
      {!utensil && item === 'shimesaba' && <Shimesaba outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'sliced_cucumber' && <SlicedCucumber outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'squid' && <Squid outline={outline} position={[0, 2.35, 0]} rotation={rotationToEuler({ x: 300, y: 0, z: 90})}/>}
      {!utensil && item === 'tentacle' && <Tentacle outline={outline} position={[0, 2.15, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'tuna' && <Tuna outline={outline} position={[-0.3, 2.05, 0.1]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      
      
      {!utensil && item === 'chukaman' && <Chukaman outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'ebi_nigiri' && <EbiNigiri outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'gyoza' && <Gyoza outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'maguro_nigiri' && <MaguroNigiri outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'octopus_nigiri' && <OctopusNigiri outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'ramen' && <Ramen outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'roll' && <Roll outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'salmon_nigiri' && <SalmonNigiri outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'salmon_roll' && <SalmonRoll outline={outline} position={[0, 2.15, 0]} rotation={rotationToEuler({ x: 270, y: 0, z: 0})}/>}
      {!utensil && item === 'sea_urchin_roll' && <SeaUrchinRoll outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'udon' && <Udon outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}
      {!utensil && item === 'wasabi' && <Wasabi outline={outline} position={[0, 2.05, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}

      {utensil?.type === 'pan' && <Pan outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 0, z: 0})}/>}

      {utensil?.type === 'pot_1' && !((utensil?.content.length ?? 0) > 0) && <Pot1Empty outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 180, z: 0})}/>}
      {utensil?.type === 'pot_1' && (utensil?.content.length ?? 0) > 0 && <Pot1Filled outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 180, z: 0})}/>}
      
      {utensil?.type === 'pot_2' && !((utensil?.content.length ?? 0) > 0) && <Pot2Empty outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 180, z: 0})}/>}
      {utensil?.type === 'pot_2' && (utensil?.content.length ?? 0) > 0 && <Pot2Filled outline={outline} position={[0, 2, 0]} rotation={rotationToEuler({ x: 0, y: 180, z: 0})}/>}
    </group>
  )
})