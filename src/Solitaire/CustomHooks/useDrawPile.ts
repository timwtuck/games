import { useState } from "react";
import useCardPile, { UseCardPile } from "./useCardPile";
import { CardType } from "../Components/GameTable";

export type UseDrawPile = UseCardPile & {
  evaluateDrop: (card: CardType) => boolean;
  drawCard: () => void;
  faceUpCards: CardType[];
  faceDownCards: CardType[];
};

const useDrawPile: (
  name: string,
  isDragging: boolean,
  setHighlightedStack: React.Dispatch<React.SetStateAction<string | null>>,
  initCards: CardType[]
) => UseDrawPile = (name, isDragging, setHighlightedStack, initCards) => {
  const [cards, setCards] = useState<CardType[]>([...initCards]);

  const [faceUpCards, setFaceUpCards] = useState<CardType[]>([]);
  const [faceDownCards, setFaceDownCards] = useState<CardType[]>([...cards]);

  const { onMouseEnter, onMouseLeave, addCards } = useCardPile(
    name,
    isDragging,
    setHighlightedStack,
    setCards
  );

  const evaluateDrop: (card: CardType) => boolean = (card) => {
    return false;
  };

  const removeCards: (card: CardType[]) => void = () => {
    setFaceUpCards((curr) => curr.slice(0, curr.length - 1));
    // setFaceUpCards((curr) => curr.filter((card) => !cards.includes(card)));
  };

  const drawCard: () => void = () => {
    if (faceDownCards.length === 0) {
      setFaceDownCards([...faceUpCards]);
      setFaceUpCards([]);
    } else {
      setFaceUpCards([...faceUpCards, faceDownCards[0]]);
      setFaceDownCards(faceDownCards.slice(1));
    }
  };

  return {
    onMouseEnter,
    onMouseLeave,
    evaluateDrop,
    addCards,
    removeCards,
    drawCard,
    faceUpCards,
    faceDownCards,
  };
};

export default useDrawPile;
