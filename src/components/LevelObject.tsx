import { type Group, Euler, Vector3 } from 'three';
import { forwardRef } from 'react';
import { Panda } from '@models/character/Panda';
import { Position } from '@mytypes/Position';
import { WallDoor } from '@models/wall/WallDoor';
import { MovableObject } from '@components/MovableObject';
import { WallNormal } from '@models/wall/WallNormal';
import { FloorWood } from '@models/floor/FloorWood';
import { Bamboo } from '@models/decoration/Bamboo';
import { Fish } from '@models/decoration/Fish';
import { Knives } from '@models/decoration/Knives';
import { PaintingSmall } from '@models/decoration/PaintingSmall';
import { Plant1 } from '@models/decoration/Plant1';
import { Plant2 } from '@models/decoration/Plant2';
import { Sign1 } from '@models/decoration/Sign1';
import { Bottles } from '@models/decoration/Bottles';
import { CabinetCorner } from '@models/decoration/CabinetCorner';
import { CabinetDoors } from '@models/decoration/CabinetDoors';
import { CabinetShelves1 } from '@models/decoration/CabinetShelves1';
import { CabinetShelves2 } from '@models/decoration/CabinetShelves2';
import { useFrame, type GroupProps } from '@react-three/fiber';
import type { Scale } from '@mytypes/Scale';
import type { EulerRotation, Rotation } from '@mytypes/Rotation';
import type { Level } from '@mytypes/Level';
import { useColliderStore } from '@stores/ColliderStore';
import { ColliderObject } from './ColliderObject';
import { CustomColliderObject } from './CustomColliderObject';
import { Box, MeshRefractionMaterial, MeshTransmissionMaterial, Stars, Stats, useFBO } from '@react-three/drei';
import { SupplyObject } from './SupplyObject';
import { WorkstationObject } from './WorkstationObject';
import { Counter } from '@models/workstation/Counter';
import { rotationToEuler } from '@utilities/rotationToEuler';
import { positionToVector3 } from '@utilities/positionToVector3';
import { ItemObject } from './ItemObject';
import { useClientStore } from '@stores/ClientStore';
import { Platform1x1Empty } from '@models/floor/Platform1x1Empty';
import { Platform2x2 } from '@models/floor/Platform2x2';
import { Platform4x4 } from '@models/floor/Platform4x4';
import { StreetStraight } from '@models/floor/StreetStraight';
import { Taxi } from '@models/decoration/Taxi';
import { FourStoryMat } from '@models/decoration/FourStoryMat';
import { SixStoryStackMat } from '@models/decoration/SixStoryStackMat';
import { ThreeStoryBalconyMat } from '@models/decoration/ThreeStoryBalconyMat';
import { ThreeStorySlimMat } from '@models/decoration/ThreeStorySlimMat';
import { WallNormalOpaque } from '@models/wall/WallNormalOpaque';
import { BlueCar } from '@models/decoration/BlueCar';
import { GreenCar } from '@models/decoration/GreenCar';
import { MintCar } from '@models/decoration/MintCar';
import { PurpleCar } from '@models/decoration/PurpleCar';
import { RedCar } from '@models/decoration/RedCar';
import { WhiteCar } from '@models/decoration/WhiteCar';

interface Props {
  level: Level,
}

function objectProps({ position, rotation, scale }: { position: Position, rotation?: EulerRotation, scale?: number | Scale }): ({ position: Vector3, rotation: Euler | undefined, scale: Vector3 | undefined }) {
  return {
    position: positionToVector3(position),
    rotation: rotation ? rotationToEuler(rotation) : undefined,
    scale: scale ? (typeof scale === 'number' ? new Vector3(scale, scale, scale) : new Vector3(scale.x, scale.y, scale.z)) : undefined,
  }
}

export const LevelObject = forwardRef<Group, GroupProps & Props>(({ level: { stars, lightColor, panda, walls, platforms, workstations, supplies, decorations, colliders }, ...props }, ref) => {
  const items = useClientStore(state => state.client?.game.items);

  return (
    <group ref={ref} {...props}>
      {/* <Stats/> */}
      
      <pointLight position={[16, 32, 16]} color={lightColor} intensity={1.5}/>

      { stars && <Stars count={50000} radius={400} factor={5}/> }

      <Panda {...objectProps(panda)}/>
  
      {walls.map((wall, index) => (
        <MovableObject collider={wall.collider} key={index} data={wall}>
          { wall.type === 'wall_door' && <WallDoor/> }
          { wall.type === 'wall_normal' && <WallNormal/> }
          { wall.type === 'wall_normal_opaque' && <WallNormalOpaque/> }
        </MovableObject>
      ))}

      {platforms.map((platform, index) => (
        <MovableObject collider={platform.collider} key={index} data={platform}>
          { platform.type === 'floor_wood' && <FloorWood/> }
          { platform.type === 'platform_1x1_empty' && <Platform1x1Empty/> }
          { platform.type === 'platform_2x2' && <Platform2x2/> }
          { platform.type === 'platform_4x4' && <Platform4x4/> }
          { platform.type === 'street_straight' && <StreetStraight/> }
        </MovableObject>
      ))}

      {workstations.map((workstation, index) => (
        <MovableObject collider={workstation.collider} key={index} data={workstation}>
          <WorkstationObject dynamic={workstation.dynamic} state={workstation}/>
        </MovableObject>
      ))}

      {supplies.map((supply, index) => (
        <MovableObject collider={supply.collider} key={index} data={supply}>
          <SupplyObject supply={supply.type} content={supply.content}/>
        </MovableObject>
      ))}

      {decorations.map((decoration, index) => (
        <MovableObject key={index} data={decoration}>
          { decoration.type === 'bamboo' && <Bamboo/> }
          { decoration.type === 'fish' && <Fish/> }
          { decoration.type === 'knives' && <Knives/> }
          { decoration.type === 'painting_small' && <PaintingSmall/> }
          { decoration.type === 'plant_1' && <Plant1/> }
          { decoration.type === 'plant_2' && <Plant2/> }
          { decoration.type === 'sign_1' && <Sign1/> }
          { decoration.type === 'bottles' && <Bottles/> }
          { decoration.type === 'cabinet_corner' && <CabinetCorner/> }
          { decoration.type === 'cabinet_doors' && <CabinetDoors/> }
          { decoration.type === 'cabinet_shelves_1' && <CabinetShelves1/> }
          { decoration.type === 'cabinet_shelves_2' && <CabinetShelves2/> }
          { decoration.type === 'blue_car' && <BlueCar/> }
          { decoration.type === 'green_car' && <GreenCar/> }
          { decoration.type === 'mint_car' && <MintCar/> }
          { decoration.type === 'purple_car' && <PurpleCar/> }
          { decoration.type === 'red_car' && <RedCar/> }
          { decoration.type === 'white_car' && <WhiteCar/> }
          { decoration.type === 'taxi' && <Taxi/> }
          { decoration.type === 'four_story_mat' && <FourStoryMat/> }
          { decoration.type === 'six_story_stack_mat' && <SixStoryStackMat/> }
          { decoration.type === 'three_story_balcony_mat' && <ThreeStoryBalconyMat/> }
          { decoration.type === 'three_story_slim_mat' && <ThreeStorySlimMat/> }
        </MovableObject>
      ))}

      {colliders.map((collider, index) => (
        <CustomColliderObject key={index} collider={collider} position={new Vector3(collider.position.x, collider.position.y, collider.position.z)}/>
      ))}

      {items?.map(item => (
        <ItemObject key={item.id} item={item}/>
      ))}
    </group>
  )
})