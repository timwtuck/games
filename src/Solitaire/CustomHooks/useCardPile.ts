import { MouseEventHandler, RefObject, useEffect, useRef } from "react";
import { CardType } from "../Components/GameTable";

export type UseCardPile = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  addCards: (card: CardType[]) => void;
  removeCards: (card: CardType[]) => void;
};

export type CustomTouch = {
  ref: RefObject<HTMLDivElement>;
  onHighlightOnTouch: (x: number, y: number) => void;
};

const useCardPile: (
  name: string,
  isDragging: boolean,
  setHighlightedStack: React.Dispatch<React.SetStateAction<string | null>>,
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
) => UseCardPile & CustomTouch = (
  name,
  isDragging,
  setHighlightedStack,
  setCards
) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseEnter: () => void = () => {
    if (isDragging) {
      setHighlightedStack(name);
    }
  };
  const onMouseLeave: () => void = () => {
    setHighlightedStack((curr) => {
      if (curr === name) return null;
      return curr;
    });
  };

  const addCards: (cards: CardType[]) => void = (cards) => {
    setCards((curr) => [...curr, ...cards]);
  };

  const removeCards: (cards: CardType[]) => void = (cards) => {
    setCards((curr) => curr.filter((card) => !cards.includes(card)));
  };

  const onHighlightOnTouch: (x: number, y: number) => void = (x, y) => {
    if (!ref.current) return;

    const area = ref.current.getBoundingClientRect();
    if (x > area.left && x < area.right && y > area.top && y < area.bottom) {
      onMouseEnter();
    } else {
      onMouseLeave();
    }
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
    onHighlightOnTouch,
    ref,
  };
};

export default useCardPile;
