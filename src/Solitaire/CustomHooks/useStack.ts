import { useState } from "react";
import useCardPile, { UseCardPile } from "./useCardPile";
import { CardType } from "../Components/GameTable";

export type UseStack = UseCardPile & {
  evaluateDrop: (card: CardType) => boolean;
  showCard: (card: CardType) => void;
  cards: CardType[];
};

const useStack: (
  name: string,
  isDragging: boolean,
  setHighlightedStack: React.Dispatch<React.SetStateAction<string | null>>,
  initCards: CardType[]
) => UseStack = (name, isDragging, setHighlightedStack, initCards) => {
  const displayCards = initCards.map((card, i) => {
    const show = i == initCards.length - 1;
    return { ...card, show };
  });

  const [cards, setCards] = useState<CardType[]>([...displayCards]);

  const { onMouseEnter, onMouseLeave, addCards, removeCards } = useCardPile(
    name,
    isDragging,
    setHighlightedStack,
    setCards
  );

  const cardColours: { [key: string]: "black" | "red" } = {
    spades: "black",
    clubs: "black",
    hearts: "red",
    diamonds: "red",
  };

  const order = [
    "king",
    "queen",
    "jack",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "ace",
  ];

  const evaluateDrop: (card: CardType) => boolean = (card) => {
    if (cards.length === 0) return card.value === "king";

    const lastCard = cards[cards.length - 1];
    const validCardIndex = order.indexOf(card.value) - 1;

    if (cardColours[lastCard.suit] === cardColours[card.suit]) return false;
    if (order[validCardIndex] !== lastCard.value) return false;

    return true;
  };

  const showCard: (card: CardType) => void = (card) => {
    if (cards.indexOf(card) !== cards.length - 1) return;

    setCards((curr) => {
      const cardIndex = curr.indexOf(card);
      const update = [...curr];
      update[cardIndex].show = true;
      return update;
    });
  };

  return {
    onMouseEnter,
    onMouseLeave,
    evaluateDrop,
    addCards,
    removeCards,
    showCard,
    cards,
  };
};

export default useStack;
