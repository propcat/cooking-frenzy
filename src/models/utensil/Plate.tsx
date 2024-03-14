import { forwardRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { Group, MeshStandardMaterial } from 'three';
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
import { useToonMaterials } from '@utilities/useToonMaterials';
import { UtensilProps } from '@models/utensil/UtensilProps';
import { ObjectOutline } from '@components/ObjectOutline';

interface Props {
  counter?: boolean,
}

export const Plate = forwardRef<Group, GroupProps & UtensilProps & Props>(({ item, outline, counter, ...props }, ref) => {
  const { nodes, materials } = useGLTF('models/utensil/plate.glb', 'draco/');

  const toonMaterials = useToonMaterials(materials);

  const transparentMaterial = useMemo(() => new MeshStandardMaterial({ transparent: true, opacity: 0 }), []);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh  geometry={(nodes.Environment_Plate as any).geometry} material={counter ? transparentMaterial : toonMaterials.Atlas} scale={1.4}>
        <ObjectOutline outline={outline}/>
      </mesh>

      {item === 'avocado' && <Avocado outline={outline} position={[0, 0.2, 0]} rotation={[200, 0, 90]}/>}
      {item === 'crabsticks' && <Crabsticks outline={outline} position={[0, 0.2, 0]}/>}
      {item === 'cucumber' && <Cucumber outline={outline} position={[0, 0.2, 0]}/>}
      {item === 'ebi' && <Ebi outline={outline} position={[0, 0.2, 0]}/>}
      {item === 'eel' && <Eel outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'fish' && <Fish outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'fish_fillet' && <FishFillet outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'flounder' && <Flounder outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'mackerel' && <Mackerel outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'nori' && <Nori outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'octopus' && <Octopus outline={outline} position={[0, 1, 0]} rotation={[-45, 0, 0]}/>}
      {item === 'rice' && <Rice outline={outline} position={[0, 0.2, 0]} rotation={[0, 0, 0]}/>}
      {item === 'salmon' && <Salmon outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'salmon_fish' && <SalmonFish outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'sea_urchin' && <SeaUrchin outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'sea_urchin_open' && <SeaUrchinOpen outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'shimesaba' && <Shimesaba outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'sliced_cucumber' && <SlicedCucumber outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'squid' && <Squid outline={outline} position={[0, 0.5, 0]} rotation={[0, 0, 80]}/>}
      {item === 'tentacle' && <Tentacle outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'tuna' && <Tuna outline={outline} position={[-0.3, 0.3, 0.1]} rotation={[-80, 0, 0]}/>}
      
      {item === 'chukaman' && <Chukaman outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'ebi_nigiri' && <EbiNigiri outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'gyoza' && <Gyoza outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'maguro_nigiri' && <MaguroNigiri outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'octopus_nigiri' && <OctopusNigiri outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'ramen' && <Ramen outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'roll' && <Roll outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'salmon_nigiri' && <SalmonNigiri outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'salmon_roll' && <SalmonRoll outline={outline} position={[0, 0.3, 0]} rotation={[-80, 0, 0]}/>}
      {item === 'sea_urchin_roll' && <SeaUrchinRoll outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'udon' && <Udon outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
      {item === 'wasabi' && <Wasabi outline={outline} position={[0, 0.3, 0]} rotation={[0, 0, 0]}/>}
    </group>
  )
})

useGLTF.preload('models/utensil/plate.glb', 'draco/');