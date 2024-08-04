import DrawPile from "./DrawPile";
import Stack from "./Stack";
import { RefObject, useEffect, useRef, useState } from "react";
import useStack, { UseStack } from "../CustomHooks/useStack";
import useDrawPile, { UseDrawPile } from "../CustomHooks/useDrawPile";
import { generateDeck } from "../Utils/GenerateDeck";
import useHomePile, { UseHomePile } from "../CustomHooks/useHomePile";
import HomePile from "./HomePile";
import { isJsxElement } from "typescript";
import { useStopwatch, useTimer } from "react-timer-hook";
import Timer from "./Timer";
import DetailsModal from "./DetailsModal";
import { buildTime } from "../Utils/utils";
import { HandleCardDrop } from "./Card";

export type CardType = {
  value: string;
  suit: string;
  show: boolean;
};

export type MoveCards = (
  cards: CardType[],
  from: string,
  to: string
) => boolean;
export type HandleCardsDrop = (cards: CardType[], from: string) => void;

type GameState = {
  draw: UseDrawPile;
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
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const undo = useRef<(() => void)[]>([]);
  const deck = generateDeck();

  const cardPile: GameState = {
    draw: useDrawPile("drawPile", isDragging, setHighlighted, deck.draw, undo),
    stack1: useStack("stack1", isDragging, setHighlighted, deck.stack1, undo),
    stack2: useStack("stack2", isDragging, setHighlighted, deck.stack2, undo),
    stack3: useStack("stack3", isDragging, setHighlighted, deck.stack3, undo),
    stack4: useStack("stack4", isDragging, setHighlighted, deck.stack4, undo),
    stack5: useStack("stack5", isDragging, setHighlighted, deck.stack5, undo),
    stack6: useStack("stack6", isDragging, setHighlighted, deck.stack6, undo),
    stack7: useStack("stack7", isDragging, setHighlighted, deck.stack7, undo),
    diamonds: useHomePile("diamonds", isDragging, setHighlighted),
    spades: useHomePile("spades", isDragging, setHighlighted),
    clubs: useHomePile("clubs", isDragging, setHighlighted),
    hearts: useHomePile("hearts", isDragging, setHighlighted),
  };

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 86399); // 10 minutes timer
  const timer = useStopwatch({ autoStart: true });

  useEffect(() => {
    const finished =
      cardPile.diamonds.cards.length === 13 &&
      cardPile.clubs.cards.length === 13 &&
      cardPile.hearts.cards.length === 13 &&
      cardPile.spades.cards.length === 13;

    setCompleted(finished);
    if (finished) {
      timer.pause();
      setShowModal(true);
    }
  }, [
    cardPile.clubs.cards,
    cardPile.diamonds.cards,
    cardPile.spades.cards,
    cardPile.hearts.cards,
  ]);

  const handleIsDragging: (dragging: boolean) => void = (dragging) => {
    setIsDragging(dragging);
  };

  const MoveCards: MoveCards = (cards, from, to) => {
    if (to == from) return false;

    const canDrop = cardPile[to as keyof GameState].evaluateDrop(cards[0]);

    if (canDrop) {
      cardPile[to as keyof GameState].addCards(cards);
      cardPile[from as keyof GameState].removeCards(cards);

      undo.current.push(() => {
        cardPile[from as keyof GameState].addCards(cards);
        cardPile[to as keyof GameState].removeCards(cards);
      });
    }

    return canDrop;
  };

  const handleManualMove: HandleCardsDrop = (cards, from) => {
    if (!highlighted) return;
    MoveCards(cards, from, highlighted);
  };

  const handleAutoMove: HandleCardsDrop = (cards, from) => {
    if (cards.length == 1 && MoveCards(cards, from, cards[0].suit)) return;

    for (let i = 1; i <= 7; i++) {
      if (MoveCards(cards, from, `stack${i}`)) return;
    }
  };

  // touch events don't work with the draggable component. The target element in the touch events
  // is the card itself rather than the pile being dragged to - different from mouse events.
  // Therefore this is to emulate the mouseEnter/mouseLeave events in touch
  const handleTouchDrag: (x: number, y: number) => void = (x, y) => {
    Object.values(cardPile).forEach((pile) => {
      if ("onHighlightOnTouch" in pile) {
        pile.onHighlightOnTouch(x, y);
      }
    });
  };

  const handleUndo = () => {
    const toUndo = undo.current.pop();
    if (toUndo) toUndo();
  };

  return (
    <>
      <div className="bg-emerald-500 md:h-full md:w-[100%] h-[100%] w-[100%]">
        <div className="flex flex-row md:h-[40%] h-[30%]">
          <button
            className="p-2 h-36 hover:bg-amber-200 hover:bg-opacity-50 flex"
            onClick={handleUndo}
          >
            <img className="w-24 h-24" src="/images/buttons/undo.svg" />
          </button>
          <DrawPile
            name="draw"
            setIsDragging={handleIsDragging}
            handleCardsDrop={handleManualMove}
            handleAutoCardsDrop={handleAutoMove}
            hook={cardPile["draw"]}
            onDragTouch={handleTouchDrag}
          />
          <Timer
            seconds={timer.seconds}
            minutes={timer.minutes}
            hours={timer.hours}
          />
          <div className="flex flex-row md:w-full flex-wrap">
            {["clubs", "spades", "hearts", "diamonds"].map((suit) => (
              <HomePile
                name={suit}
                highlightedStack={highlighted}
                setIsDragging={handleIsDragging}
                handleCardsDrop={handleManualMove}
                handleAutoCardsDrop={handleAutoMove}
                hook={cardPile[suit as keyof GameState] as UseHomePile}
                onDragTouch={handleTouchDrag}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row md:h-2/5 flex-wrap">
          {[1, 2, 3, 4, 5, 6, 7].map((stackNum) => (
            <Stack
              name={`stack${stackNum}`}
              highlightedStack={highlighted}
              handleCardsDrop={handleManualMove}
              handleAutoCardsDrop={handleAutoMove}
              hook={cardPile[`stack${stackNum}` as keyof GameState] as UseStack}
              setIsDragging={handleIsDragging}
              onDragTouch={handleTouchDrag}
            />
          ))}
        </div>
        {completed && (
          <p className="absolute text-2xl inset-y-1/2 w-full">
            You are the winner!
          </p>
        )}
      </div>
      <DetailsModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        time={buildTime(timer.hours, timer.minutes, timer.seconds)}
      />
    </>
  );
};

export default GameTable;
