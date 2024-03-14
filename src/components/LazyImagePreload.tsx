import styled from 'styled-components'
import { BaseIngredients, ProcessedIngredients } from '@mytypes/Ingredient'
import { Foods } from '@/mytypes/Food'
import { Workstations } from '@mytypes/Workstation';
import { Utensils } from '@mytypes/Utensil';

/*
  This component is called lazy because the way I "preload" these images is VERY lazy.
  There are definitely better solutions, but whatever. Oopsie!
*/

export function LazyImagePreload() {
  return (
    <>
      <Image src='logo.svg'/>

      {BaseIngredients.map(ingredient => (
        <Image key={ingredient} src={`previews/${ingredient}.webp`}/>
      ))}

      {ProcessedIngredients.map(ingredient => (
        <Image key={ingredient} src={`previews/${ingredient}.webp`}/>
      ))}

      {Foods.map(food => (
        <Image key={food} src={`previews/${food}.webp`}/>
      ))}

      {Workstations.map(workstation => (
        <Image key={workstation} src={`previews/${workstation}.webp`}/>
      ))}

      {Utensils.map(utensil => (
        <Image key={utensil} src={`previews/${utensil}.webp`}/>
      ))}
    </>
  )
}

const Image = styled.img`
  max-width: 0px;
  max-height: 0px;
  display: none;
  opacity: 0;
  touch-action: none;
  pointer-events: none;
`

const Video = styled.video`
  max-width: 0px;
  max-height: 0px;
  display: none;
  opacity: 0;
  touch-action: none;
  pointer-events: none;
`