import { MouseEventHandler, useEffect } from "react";
import { CardType } from "../Components/GameTable";

export type UseCardPile = {
  onMouseEnter: MouseEventHandler;
  onMouseLeave: MouseEventHandler;
  addCards: (card: CardType[]) => void;
  removeCards: (card: CardType[]) => void;
};

const useCardPile: (
  name: string,
  isDragging: boolean,
  setHighlightedStack: React.Dispatch<React.SetStateAction<string | null>>,
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
) => UseCardPile = (name, isDragging, setHighlightedStack, setCards) => {
  const onMouseEnter: MouseEventHandler = (e) => {
    if (isDragging) setHighlightedStack(name);
  };
  const onMouseLeave: MouseEventHandler = (e) => {
    setHighlightedStack(null);
  };

  const addCards: (cards: CardType[]) => void = (cards) => {
    setCards((curr) => [...curr, ...cards]);
  };

  const removeCards: (cards: CardType[]) => void = (cards) => {
    setCards((curr) => curr.filter((card) => !cards.includes(card)));
  };

  useEffect(() => {
    if (!isDragging) {
      setHighlightedStack(null);
    }
  }, [isDragging]);

  return {
    onMouseEnter,
    onMouseLeave,
    addCards,
    removeCards,
  };
};

export default useCardPile;
