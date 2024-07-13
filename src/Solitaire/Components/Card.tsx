import Draggable, {
  ControlPosition,
  DraggableCore,
  DraggableEventHandler,
} from "react-draggable";
import ReactDOM from "react-dom";
import { useDrag } from "react-dnd";
import { CardType, HandleCardsDrop, ItemTypes } from "./GameTable";
import { MouseEventHandler, useRef, useState } from "react";

export type HandleCardDrop = (cards: CardType, from: string) => void;

type Props = {
  className?: string;
  card: CardType;
  canDrag: boolean;
  position: ControlPosition;
  setIsDragging?: (isDragging: boolean) => void;
  handleCardDrop?: HandleCardDrop;
  pile: string;
  revealCard?: (card: CardType) => void;
  showCard: boolean;
  onDragging?: (card: CardType, x: number, y: number) => void;
  draggingClassName?: string | null;
};

const Card = ({
  className = undefined,
  card,
  canDrag,
  position,
  setIsDragging,
  handleCardDrop,
  pile,
  revealCard = undefined,
  showCard,
  onDragging = undefined,
  draggingClassName = undefined,
}: Props) => {
  const [disablePointers, setDisablePointers] = useState(false);
  const onStart: DraggableEventHandler = (e, data) => {
    if (setIsDragging) setIsDragging(true);
    setDisablePointers(true);
  };
  const onStop: DraggableEventHandler = (e, data) => {
    if (setIsDragging) setIsDragging(false);
    setDisablePointers(false);
    if (handleCardDrop) handleCardDrop(card, pile);
  };

  const onDrag: DraggableEventHandler = (e, data) => {
    if (onDragging) onDragging(card, data.x, data.y);
  };

  const disableEvents: () => string = () => {
    return disablePointers ? " pointer-events-none" : "";
  };

  const onClick: () => void = () => {
    if (!card.show && revealCard) revealCard(card);
  };

  const imgPath = showCard
    ? `/images/png/${card.value}_of_${card.suit}.png`
    : "/images/blue_back.svg";

  return (
    <>
      <Draggable
        disabled={!canDrag || !card.show}
        onStart={onStart}
        onStop={onStop}
        position={position}
        defaultClassName={draggingClassName ?? "z-0"}
        defaultClassNameDragging={draggingClassName ?? "z-50"}
        onDrag={onDrag}
        bounds="body"
      >
        <div
          className={`md:w-[11%] w-[20%] ${className} ${disableEvents()}`}
          onClick={onClick}
        >
          <img
            src={imgPath}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </Draggable>
    </>
  );
};

export default Card;
