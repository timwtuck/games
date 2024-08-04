import Draggable, {
  ControlPosition,
  DraggableEventHandler,
} from "react-draggable";
import { CardType } from "./GameTable";
import { useState } from "react";

export type HandleCardDrop = (cards: CardType, from: string) => void;

type Props = {
  className?: string;
  card: CardType;
  canDrag: boolean;
  position: ControlPosition;
  setIsDragging?: (isDragging: boolean) => void;
  handleCardDrop?: HandleCardDrop;
  handleAutoCardDrop?: HandleCardDrop;
  pile: string;
  revealCard?: (card: CardType) => void;
  showCard: boolean;
  onDragging?: (card: CardType, x: number, y: number) => void;
  draggingClassName?: string | null;
  onTouch: (x: number, y: number) => void;
};

const Card = ({
  className = undefined,
  card,
  canDrag,
  position,
  setIsDragging,
  handleCardDrop = undefined,
  handleAutoCardDrop = undefined,
  pile,
  revealCard = undefined,
  showCard,
  onDragging = undefined,
  draggingClassName = undefined,
  onTouch,
}: Props) => {
  const [disablePointers, setDisablePointers] = useState(false);
  const onStart: DraggableEventHandler = (e, data) => {
    if (setIsDragging) setIsDragging(true);
  };
  const onStop: DraggableEventHandler = (e, data) => {
    if (setIsDragging) setIsDragging(false);
    setDisablePointers(false);
    if (handleCardDrop) handleCardDrop(card, pile);
  };

  const onDrag: DraggableEventHandler = (e, data) => {
    setDisablePointers(true);
    if (e instanceof TouchEvent) {
      onTouch(e.touches[0].clientX, e.touches[0].clientY);
    }
    if (onDragging) onDragging(card, data.x, data.y);
  };

  const disableEvents: () => string = () => {
    return disablePointers ? " pointer-events-none" : "";
  };

  const onClick: () => void = () => {
    if (!card.show && revealCard) revealCard(card);
  };

  const onDoubleClick: () => void = () => {
    if (handleAutoCardDrop) handleAutoCardDrop(card, pile);
  };

  const imgPath = showCard
    ? `/images/png/${card.value}_of_${card.suit}.png`
    : "/images/blue_back.svg";

  return (
    <div onDoubleClick={onDoubleClick}>
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
            id={`${card.value}_${card.suit}`}
            src={imgPath}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      </Draggable>
    </div>
  );
};

export default Card;
