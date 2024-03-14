import { recipes } from '@constants/recipes';
import { GameData } from '@gamedata';
import { ProcessedIngredients } from '@mytypes/Ingredient';
import { Order } from '@mytypes/Order';
import { useClientStore } from '@stores/ClientStore';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { PiKnifeFill } from 'react-icons/pi';
import styled from 'styled-components'

const getOrderId = (order: Order) => `${order.food}-${order.start}-${order.time}`;

export function OrderLayout() {
  const orders = useClientStore(state => state.client?.game.orders);

  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const currentRecipe = useMemo(() => GameData.recipes.find(recipe => recipe.result === orders?.find(order => getOrderId(order) === currentOrderId)?.food), [orders, currentOrderId]);
  const processedIngredients = useMemo(() => currentRecipe?.ingredients.filter(ingredient => ProcessedIngredients.includes(ingredient)), [currentRecipe]);

  useEffect(() => {
    if(!orders || orders.length === 0) return;

    if(!orders.find(order => getOrderId(order) === currentOrderId)) {
      setCurrentOrderId(getOrderId(orders[0]));
    }
  }, [orders])

  return (
    <Container>
      <Orders>
        {orders?.map(order => {
          const id = getOrderId(order);

          return (
            <OrderElement
              key={id}
              onMouseUp={() => setCurrentOrderId(getOrderId(order))}
              onTouchEnd={() => setCurrentOrderId(getOrderId(order))}
              active={id === currentOrderId}
              order={order}
            />
          )
        })}
      </Orders>
      <Ingredients>
        {(currentRecipe?.type === 'process' || currentRecipe?.type === 'cook') && (
          <IngredientGroup style={{ padding: 0 }}>
            {/* @ts-ignore */}
            <IngredientElement src={`previews/${currentRecipe.utensil ?? currentRecipe.workstation}.webp`}/>
          </IngredientGroup>
        )}
        <IngredientGroup>
          {currentRecipe?.ingredients.map((ingredient, index) => {
            return (
              <IngredientElement key={index} src={`previews/${ingredient}.webp`}/>
            )
          })}
        </IngredientGroup>
        <IngredientGroup>
          {processedIngredients?.map((ingredient, index) => {
            const recipe = recipes.find(r => r.result === ingredient);

            if(!recipe || recipe.type !== 'process') return null;

            return (
              <>
                {recipe.ingredients.length > 0 && (
                  <>
                    <IngredientElement key={`${index}-base`} src={`previews/${recipe.ingredients[0]}.webp`}/>
                    {recipe.workstation === 'cutting_table' && <PiKnifeFill key={`${index}-workstation`}/>}
                  </>
                )}
                <IngredientElement key={`${index}-result`} src={`previews/${recipe.result}.webp`}/>
              </>
            )
          })}
        </IngredientGroup>
      </Ingredients>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 110;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 12px 8px;
  gap: 10px;
`

const Orders = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
`

function OrderElement({ order, active, ...props }: { order: Order, active: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onInterval() {
      const now = Rune.gameTime();
      
      const timePassed = now - order.start;
      
      setProgress(Math.floor((timePassed / order.time) * 100) / 100);
    }
    
    const interval = setInterval(onInterval, 50);

    return () => {
      clearInterval(interval);
    }
  }, [order])

  return (
    //@ts-ignore
    <OrderContainer
      active={active}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0.625 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      <OrderContent>
        <img src={`previews/${order.food}.webp`}/>
      </OrderContent>
      <ProgressBar>
        <motion.div animate={{ width: `${progress * 100}%` }}/>
      </ProgressBar>
    </OrderContainer>
  )
}

const OrderContainer = styled(motion.button)<{ active: boolean }>`
  border: none; 
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
  background-color: transparent;
`

const ProgressBar = styled.div`
  position: relative;
  width: calc(min(56px, 100vw / 5 - 16px) - 2px);
  height: 5px;
  background-color: #FFFFFA;
  border-radius: 8px;
  overflow: hidden;

  & > div {
    position: absolute;
    width: 0;
    height: 100%;
    background-color: #452fab;
    border-radius: 8px;
  }
`

const OrderContent = styled.div`
  position: relative;
  width: calc(min(56px, 100vw / 5 - 16px));
  aspect-ratio: 1;
  border-radius: 8px;
  padding: 4px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFFFFA;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const Ingredients = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  overflow-y: hidden;
  overflow-x: auto;
`

const IngredientGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 0 4px;
  border-radius: 8px;
  background-color: #FFFFFA;
  font-size: calc(min(22px, 100vw / 8 - 16px));
  color: #1b0035;
`

const IngredientElement = styled.img`
  width: calc(min(36px, 100vw / 6 - 16px));
  aspect-ratio: 1;
  border-radius: 8px;
  padding: 4px;
  object-fit: contain;
`