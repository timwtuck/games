import { useState } from "react";
import useCardPile, { UseCardPile } from "./useCardPile";
import { CardType } from "../Components/GameTable";

export type UseHomePile = UseCardPile & {
  evaluateDrop: (card: CardType) => boolean;
  cards: CardType[];
};

const useHomePile: (
  suit: string,
  isDragging: boolean,
  setHighlightedStack: React.Dispatch<React.SetStateAction<string | null>>
) => UseHomePile = (suit, isDragging, setHighlightedStack) => {
  const [cards, setCards] = useState<CardType[]>([]);

  const { onMouseEnter, onMouseLeave, addCards, removeCards } = useCardPile(
    suit,
    isDragging,
    setHighlightedStack,
    setCards
  );

  const order = [
    "ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];

  const evaluateDrop: (card: CardType) => boolean = (card) => {
    if (card.suit !== suit) return false;

    if (cards.length === 0) return card.value === "ace";

    const lastCard = cards[cards.length - 1];
    const validCardIndex = order.indexOf(card.value) - 1;

    if (order[validCardIndex] !== lastCard.value) return false;

    return true;
  };

  return {
    onMouseEnter,
    onMouseLeave,
    evaluateDrop,
    addCards,
    removeCards,
    cards,
  };
};

export default useHomePile;
