import { InitLogicUpdate } from 'rune-games-sdk';
import { GameState } from './types/GameState';
import { GameData } from '@gamedata';
import { Food, Foods } from '@mytypes/Food';
import { Ingredient, ProcessedIngredients } from '@mytypes/Ingredient';
import { Order } from '@mytypes/Order';
import { Position } from '@mytypes/Position';
import { Recipe } from '@mytypes/Recipe';
import { UtensilState } from '@mytypes/UtensilState';
import { getRecipe } from '@utilities/getRecipe';
import { stringToUtensil } from '@utilities/stringToUtensil';
import { utensilToString } from '@utilities/utensilToString';
import { WorkstationState } from '@mytypes/WorkstationState';
import { ItemState } from '@mytypes/ItemState';
import { calculateDistance } from '@utilities/calculateDistance';

const DEFAULT_MOVABLE_OBJECT_SPEED = 1000;
const DEFAULT_MOVABLE_OBJECT_PAUSE = 0;

export const update: InitLogicUpdate<GameState> = ({ allPlayerIds, game }) => {
  if(game.status !== 'game') return;

  if(!game.level.loaded) {
    game.level.startedAt = Rune.gameTime();

    const allPlayersLoaded = !game.players.find(player => !game.level.loadedPlayersIds.includes(player.id));

    if(allPlayersLoaded) game.level.loaded = true;
  }

  if(!game.level.loaded) return;

  type UpdateWorkstationProps = { workstationId: string, cooking?: boolean } & ({ child: 'items', items: (Ingredient | Food)[], item?: undefined } | { child: 'utensil', items?: undefined, item: UtensilState } | { child: null, items?: undefined, item?: undefined });

  function updateWorkstation({ workstationId, cooking, child, items, item }: UpdateWorkstationProps) {
    game.workstations = game.workstations.map(workstation => {
      if(workstation.id !== workstationId) return workstation;

      return { ...workstation, child, cooking: cooking ?? workstation.cooking, item: item ? utensilToString(item) : undefined, items: items ? [ ...items ]: undefined };
    }) as typeof game.workstations;
  }

  function getRemainingItems(items: (Ingredient | Food)[], ingredients: Ingredient[]) {
    const tempItems = [ ...items ];

    for(const ingredient of ingredients) {
      const index = tempItems.findIndex(item => item === ingredient);
      
      if(index < 0) continue;

      tempItems.splice(index, 1);
    }

    return tempItems;
  }
    
  /* COOKING */

  for(const workstation of game.workstations) {
    if(!workstation.child) continue;

    let recipe: Recipe | null = null;

    const utensil = workstation.child === 'utensil' ? stringToUtensil(workstation.item) : null;
    const items = workstation.child === 'items' ? workstation.items : (utensil?.content ?? []);

    if(workstation.child === 'items') recipe = getRecipe(workstation.type, items);
    else if(workstation.child === 'utensil') recipe = getRecipe(workstation.type, items, utensil!.type);

    if(!recipe) continue;

    const now = Rune.gameTime();

    if(recipe.type === 'assembly') {
      if(workstation.child === 'items') updateWorkstation({
        workstationId: workstation.id,
        child: 'items',
        items: [ recipe.result, ...getRemainingItems(workstation.items, recipe.ingredients) ],
      });

      else updateWorkstation({
        workstationId: workstation.id,
        child: 'utensil',
        item: { ...utensil!, content: [ recipe.result, ...getRemainingItems(utensil!.content, recipe.ingredients) ]},
      })
    }

    else if(workstation.cooking && now >= workstation.cookingSince + workstation.cookingGoal) {
      if(workstation.child === 'items') updateWorkstation({
        workstationId: workstation.id,
        cooking: false,
        child: 'items',
        items: [ recipe.result, ...getRemainingItems(workstation.items, recipe.ingredients) ],
      })

      else if(workstation.child === 'utensil') {
        const utensil = stringToUtensil(workstation.item);

        updateWorkstation({
          workstationId: workstation.id,
          cooking: false,
          child: 'utensil',
          item: { ...utensil, content: [ recipe.result, ...getRemainingItems(utensil.content, recipe.ingredients) ] }
        })
      }
    }
    
    else if(!workstation.cooking && recipe.type === 'cook') {
      game.workstations = game.workstations.map(w => {
        if(w.id !== workstation.id || recipe?.type !== 'cook') return w;

        return { ...w, cooking: true, cookingSince: now, cookingGoal: recipe.time * 1000, items: items ? [ ...items ] : null };
      }) as typeof game.workstations;
    }
  }

  /* CREATE ORDERS */

  const gameTimePassed = (Rune.gameTime() - game.level.startedAt) / (10 * 60 * 1000);

  const playerCount = allPlayerIds.length;
  const ordersPerPlayer = 1.5 + (gameTimePassed / playerCount);
  const ordersToCreate = Math.floor(Math.min(playerCount * ordersPerPlayer - game.orders.length, 1));
  const orderTime = Math.max(Math.floor(75 - gameTimePassed * 2 * 45), 30);

  const orderMinInterval = Math.floor(15 - gameTimePassed * 7.5);
  const maxOrders = 5;

  let lastOrder: Order | null = null;

  for(const order of game.orders) {
    if(!lastOrder || order.start > lastOrder.start) lastOrder = order;
  }

  if(!lastOrder || Rune.gameTime() - lastOrder.start >= orderMinInterval * 1000) {
    const firstOrderCompleted = game.completedOrders.completed >= 1;

    if(ordersToCreate > 0 && game.orders.length < maxOrders) {
      const newOrders: Order[] = [];

      for(let i = 0; i < ordersToCreate; i++) {
        if(game.orders.length + newOrders.length >= maxOrders) break;
        
        const isFirstOrderToBeCompleted = i === 0 && game.orders.length === 0 && game.completedOrders.completed === 0;

        if(!isFirstOrderToBeCompleted && !firstOrderCompleted) break;
        
        let randomFoodIndex: number;

        do {
          randomFoodIndex = Math.floor(Math.random() * Foods.length);
        } while(game.orders.find(order => order.food === Foods[randomFoodIndex]) || newOrders.find(order => order.food === Foods[randomFoodIndex]) || (game.completedOrders.completed < 3 && GameData.recipes.find(recipe => recipe.result === Foods[randomFoodIndex])?.ingredients.find(ingredient => ProcessedIngredients.find(i => i === ingredient))));

        newOrders.push({
          food: Foods[randomFoodIndex],
          start: Rune.gameTime(),
          time: (isFirstOrderToBeCompleted ? orderTime * 3 : orderTime) * 1000,
        })
      }

      game.completedOrders.total = game.completedOrders.total + newOrders.length;
      game.orders = [ ...game.orders, ...newOrders ];
    }
  }

  /* DELETE EXPIRED ORDERS */

  game.orders = game.orders.filter(order => (Rune.gameTime() - order.start) <= order.time);

  /* ACCEPT ORDERS FROM PLAYERS */

  game.players = game.players.map(player => {
    if(player.carry !== 'item') return player;

    const pandaPosition: Position = GameData.levels[game.level.levelIndex].panda.position;
    const maxDistance = 6;

    const distance = calculateDistance({ x: player.position.x, z: player.position.z }, { x: pandaPosition.x, z: pandaPosition.z });
    
    if(distance >= maxDistance) return player;

    const orderIndex = game.orders.findIndex(order => order.food === player.item);

    if(orderIndex < 0) return player;
      
    game.orders.splice(orderIndex, 1);
    game.completedOrders.completed = game.completedOrders.completed + 1;

    return {
      ...player,
      position: { ...player.position },
      rotation: { ...player.rotation },
      carry: null,
      item: undefined,
    };
  })

  /* ON ITEM FALL ON WORKSTATION */

  const tempItems = [ ...game.items ];

  for(const itemState of tempItems) {
    const { startedAt, path, carry: child, item } = itemState;

    const time = (Rune.gameTime() - startedAt) / 1000;

    const getPosition = (itemState: ItemState) => {
      if(itemState.path.points.length === 0) return itemState.initialPosition;
      else {
        const index = Math.min(Math.round(time / (path.duration / path.points.length)), path.points.length - 1);

        return path.points[index];
      }
    }

    const { x, z } = getPosition(itemState);

    let closestWorkstation: WorkstationState | null = null;
    let closestWorkstationDistance = 0;

    const maxPandaDistance = 6;

    const { x: pandaX, z: pandaZ } = GameData.levels[game.level.levelIndex].panda.position;

    const pandaDistance = calculateDistance({ x, z }, { x: pandaX, z: pandaZ });

    if(pandaDistance <= maxPandaDistance) {
      const orderIndex = game.orders.findIndex(order => order.food === item);

      if(orderIndex >= 0) {
        game.orders.splice(orderIndex, 1);
        game.completedOrders.completed = game.completedOrders.completed + 1;
        game.items = game.items.filter(i => i.id !== itemState.id);

        continue;
      }
    }

    const maxWorkstationDistance = 2;

    for(const w of game.workstations) {
      const workstation = GameData.levels[game.level.levelIndex].workstations.find(workstation => workstation.id === w.id);

      if(!workstation) continue;

      let wx = 0;
      let wy = 0;
      let wz = 0;

      if(workstation.dynamic) {
        const time = Rune.gameTime();

        const pointDuration = workstation.speed ?? DEFAULT_MOVABLE_OBJECT_SPEED;
        const pointDurationWithPause = pointDuration + (workstation.pause ?? DEFAULT_MOVABLE_OBJECT_PAUSE);

        const pointsPassed = Math.floor(time / pointDurationWithPause);
        const pointIndex = pointsPassed % workstation.path.length;
        const pointTime = time - pointsPassed * pointDurationWithPause;

        const progress = Math.min(pointTime / pointDuration, 1);

        const { point: initialPosition } = workstation.path[pointIndex];
        const { point: nextPosition } = workstation.path[pointIndex + 1 < workstation.path.length ? pointIndex + 1 : 0];

        wx = initialPosition.x + (nextPosition.x - initialPosition.x) * progress;
        wy = initialPosition.y + (nextPosition.y - initialPosition.y) * progress;
        wz = initialPosition.z + (nextPosition.z - initialPosition.z) * progress;
      }

      else {
        wx = workstation.position.x;
        wy = workstation.position.y;
        wz = workstation.position.z;
      }

      const distance = Math.sqrt(Math.pow(x - wx, 2) + Math.pow(z - wz, 2));

      if((closestWorkstation === null || closestWorkstationDistance > distance) && distance <= maxWorkstationDistance) {
        closestWorkstation = w;
        closestWorkstationDistance = distance;
      }
    }

    if(!closestWorkstation) continue;

    let itemPlaced = false;
    
    game.workstations = game.workstations.map(workstation => {
      if(workstation.id !== closestWorkstation!.id) return workstation;

      if(child === 'item') {
        if(workstation.child === 'items' || !workstation.child) {
          const tempChildren = [ ...(workstation.child === 'items' ? workstation.items : [])];

          if(tempChildren.length + 1 >= workstation.size) return workstation;

          itemPlaced = true;
          return { ...workstation, child: 'items', items: [ ...tempChildren, item ] };
        }
        
        else if(workstation.child === 'utensil') {
          const utensil = stringToUtensil(workstation.item);

          if(utensil.content.length + 1 <= utensil.size) {
            itemPlaced = true;
            return { ...workstation, item: utensilToString({ ...utensil, content: [ ...utensil.content, item ] }), items: [] };
          }

          else return workstation;
        }
      }

      else if(child === 'utensil') {
        if(workstation.child === 'utensil' || workstation.disabled) return workstation;
        if(workstation.type === 'cutting_table' || workstation.type === 'chukaman_steamer') return workstation;

        const utensil = stringToUtensil(item);

        if(workstation.child === 'items') {
          if(workstation.items.length + utensil.content.length > utensil.size) return workstation;
          
          utensil.content = [ ...workstation.items, ...utensil.content ];

          itemPlaced = true;
          return { ...workstation, child, item: utensilToString(utensil), items: [] };
        }

        itemPlaced = true;
        return { ...workstation, child, item, items: [] };
      }

    }) as typeof game.workstations;

    if(itemPlaced) game.items = game.items.filter(i => i.id !== itemState.id);
  }

  /* END GAME */

  const levelDuration = GameData.levels[game.level.levelIndex].durationSeconds;
  const gameOver = Rune.gameTime() - game.level.startedAt >= levelDuration * 1000;

  if(gameOver) game.status = 'gameover';
}