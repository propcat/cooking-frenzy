import { GameData } from '@gamedata';
import { actions } from '@logic/actions';
import { Food } from '@mytypes/Food';
import { Ingredient } from '@mytypes/Ingredient';
import { UtensilState } from '@mytypes/UtensilState';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { utensilToString } from '@utilities/utensilToString';

export const interact: typeof actions.interact = ({ workstationId }, { game, playerId }) => {
  const player = game.players.find(player => player.id === playerId);
  const workstation = game.workstations.find(workstation => workstation.id === workstationId);

  if(!workstation || !player) return;

  const properties = GameData.workstationProperties[workstation.type];

  type SetPlayerItemProps = { carry: 'item', item: Ingredient | Food } | { carry: 'utensil', item: UtensilState } | { carry: null, item?: undefined };

  function setPlayerCarry({ carry, item }: SetPlayerItemProps) {
    game.players = game.players.map(player => {
      if(player.id !== playerId) return player;

      return { ...player, position: { ...player.position }, rotation: { ...player.rotation }, carry, item: carry === 'utensil' ? utensilToString(item) : item };
    }) as typeof game.players;
  }

  type SetWorkstationItemsProps = { child: 'items', items: (Ingredient | Food)[], item?: undefined } | { child: 'utensil', items?: undefined, item: UtensilState } | { child: null, items?: undefined, item?: undefined };

  function setWorkstationChild({ child, items, item }: SetWorkstationItemsProps) {
    game.workstations = game.workstations.map(workstation => {
      if(workstation.id !== workstationId) return workstation;

      return { ...workstation, child, item: item ? utensilToString(item) : undefined, items: items ? [ ...items ]: undefined };
    }) as typeof game.workstations;
  }

  if(workstation.child === 'items') {
    const workstationItems = [ ...workstation.items ];

    if(player.carry === 'item') {
      const playerItem = player.item;

      if(workstationItems.length === workstation.size) {
        setPlayerCarry({ carry: 'item', item: workstationItems[0] });
        setWorkstationChild({ child: 'items', items: [ ...workstationItems.slice(1), playerItem ]});
      }

      else {
        if(!properties.allowItems) return;
        
        setPlayerCarry({ carry: null });
        setWorkstationChild({ child: 'items', items: [...workstationItems, playerItem ]});
      }
    }

    else if(player.carry === 'utensil') {
      const playerUtensil = stringToUtensil(player.item);

      if(workstationItems.length > 0) {
        if(workstationItems.length + playerUtensil.content.length <= playerUtensil.size) {
          setPlayerCarry({ carry: 'utensil', item: { ...playerUtensil, content: [ ...workstationItems, ...playerUtensil.content ] } });
          setWorkstationChild({ child: null });
        }
      }

      else {
        if(!properties.unpackUtensils) return;

        setPlayerCarry({ carry: 'utensil', item: { ...playerUtensil, content: [] }});
        setWorkstationChild({ child: 'items', items: playerUtensil.content });
      }
    }

    else {
      setPlayerCarry({ carry: 'item', item: workstationItems[0] });
      
      if(workstationItems.length === 1) setWorkstationChild({ child: null });
      else setWorkstationChild({ child: 'items', items: [ ...workstationItems.slice(1) ]});
    }
  }

  else if(workstation.child === 'utensil') {
    const workstationUtensil = stringToUtensil(workstation.item);

    if(player.carry === 'item') {
      const playerItem = player.item;

      if(workstationUtensil.content.length === workstationUtensil.size) {
        setPlayerCarry({ carry: 'utensil', item: workstationUtensil });
        setWorkstationChild({ child: 'items', items: [ playerItem ] });
      }

      else {
        setPlayerCarry({ carry: null });
        setWorkstationChild({ child: 'utensil', item: { ...workstationUtensil, content: [ ...workstationUtensil.content, playerItem ] } });
      }
    }

    else if(player.carry === 'utensil') {
      const playerUtensil = stringToUtensil(player.item);

      setPlayerCarry({ carry: 'utensil', item: workstationUtensil });
      setWorkstationChild({ child: 'utensil', item: playerUtensil });
    }

    else {
      setPlayerCarry({ carry: 'utensil', item: workstationUtensil });
      setWorkstationChild({ child: null });
    }
  }

  else {
    if(player.carry === 'item') {
      if(!properties.allowItems) return;

      const playerItem = player.item;
      
      setPlayerCarry({ carry: null });
      setWorkstationChild({ child: 'items', items: [ playerItem ] });
    }

    else if(player.carry === 'utensil') {
      const playerUtensil = stringToUtensil(player.item);

      if(playerUtensil.content.length === 0 || (properties.allowUtensils && !properties.unpackUtensils)) {
        if(!properties.allowUtensils) return;

        setPlayerCarry({ carry: null });
        setWorkstationChild({ child: 'utensil', item: playerUtensil });
      }
      
      else {
        if(!properties.unpackUtensils) return;
        
        setPlayerCarry({ carry: 'utensil', item: { ...playerUtensil, content: [] } });
        setWorkstationChild({ child: 'items', items: playerUtensil.content });
      }
    }
  }
}