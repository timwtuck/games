import DrawPile from "./DrawPile";
import Stack from "./Stack";
import { useEffect, useState } from "react";
import useStack, { UseStack } from "../CustomHooks/useStack";
import useDrawPile, { UseDrawPile } from "../CustomHooks/useDrawPile";
import { generateDeck } from "../Utils/GenerateDeck";
import useHomePile, { UseHomePile } from "../CustomHooks/useHomePile";
import HomePile from "./HomePile";

export type CardType = {
  value: string;
  suit: string;
  show: boolean;
};

export type HandleCardsDrop = (cards: CardType[], from: string) => void;

type GameState = {
  drawPile: UseDrawPile;
  stack1: UseStack;
  stack2: UseStack;
  stack3: UseStack;
  stack4: UseStack;
  stack5: UseStack;
  stack6: UseStack;
  stack7: UseStack;
  diamonds: UseHomePile;
  spades: UseHomePile;
  clubs: UseHomePile;
  hearts: UseHomePile;
};

export const ItemTypes = {
  CARD: "card",
};

const GameTable = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [highlightedStack, setHighlightedStack] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const deck = generateDeck();

  const cardPile: GameState = {
    drawPile: useDrawPile(
      "drawPile",
      isDragging,
      setHighlightedStack,
      deck.drawPile
    ),
    stack1: useStack("stack1", isDragging, setHighlightedStack, deck.stack1),
    stack2: useStack("stack2", isDragging, setHighlightedStack, deck.stack2),
    stack3: useStack("stack3", isDragging, setHighlightedStack, deck.stack3),
    stack4: useStack("stack4", isDragging, setHighlightedStack, deck.stack4),
    stack5: useStack("stack5", isDragging, setHighlightedStack, deck.stack5),
    stack6: useStack("stack6", isDragging, setHighlightedStack, deck.stack6),
    stack7: useStack("stack7", isDragging, setHighlightedStack, deck.stack7),
    diamonds: useHomePile("diamonds", isDragging, setHighlightedStack),
    spades: useHomePile("spades", isDragging, setHighlightedStack),
    clubs: useHomePile("clubs", isDragging, setHighlightedStack),
    hearts: useHomePile("hearts", isDragging, setHighlightedStack),
  };

  useEffect(() => {
    const finished =
      cardPile.diamonds.cards.length === 13 &&
      cardPile.clubs.cards.length === 13 &&
      cardPile.hearts.cards.length === 13 &&
      cardPile.spades.cards.length === 13;

    setCompleted(finished);
  }, [
    cardPile.clubs.cards,
    cardPile.diamonds.cards,
    cardPile.spades.cards,
    cardPile.hearts.cards,
  ]);

  const handleIsDragging: (dragging: boolean) => void = (dragging) => {
    setIsDragging(dragging);
  };

  const handleCardsDrop: HandleCardsDrop = (cards, from) => {
    if (!highlightedStack) return;
    if (highlightedStack == from) return;

    const canDrop = cardPile[highlightedStack as keyof GameState].evaluateDrop(
      cards[0]
    );

    if (canDrop) {
      cardPile[highlightedStack as keyof GameState].addCards(cards);
      cardPile[from as keyof GameState].removeCards(cards);
    }
  };

  return (
    <div className="bg-emerald-500 md:h-full md:w-full h-[100%] w-[100%]">
      <div className="flex flex-row md:h-[40%] h-[30%]">
        <DrawPile
          setIsDragging={handleIsDragging}
          handleCardsDrop={handleCardsDrop}
          hook={cardPile["drawPile"]}
        />
        <div className="flex flex-row md:w-[100%] flex-wrap">
          {["clubs", "spades", "hearts", "diamonds"].map((suit) => (
            <HomePile
              name={suit}
              highlightedStack={highlightedStack}
              setIsDragging={handleIsDragging}
              handleCardsDrop={handleCardsDrop}
              hook={cardPile[suit as keyof GameState] as UseHomePile}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row md:h-2/5 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7].map((stackNum) => (
          <Stack
            name={`stack${stackNum}`}
            highlightedStack={highlightedStack}
            handleCardsDrop={handleCardsDrop}
            hook={cardPile[`stack${stackNum}` as keyof GameState] as UseStack}
            setIsDragging={handleIsDragging}
          />
        ))}
      </div>
      {completed && (
        <p className="absolute text-2xl inset-y-1/2 w-full">
          You are the winner!
        </p>
      )}
    </div>
  );
};

export default GameTable;
