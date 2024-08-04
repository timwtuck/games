import { MouseEventHandler } from "react";
import Card, { HandleCardDrop } from "./Card";
import { HandleCardsDrop } from "./GameTable";
import { UseDrawPile } from "../CustomHooks/useDrawPile";

type Props = {
  name: string;
  setIsDragging: (isDragging: boolean) => void;
  handleCardsDrop: HandleCardsDrop;
  handleAutoCardsDrop: HandleCardsDrop;
  hook: UseDrawPile;
  onDragTouch: (x: number, y: number) => void;
};

const DrawPile = ({
  name,
  setIsDragging,
  handleCardsDrop,
  handleAutoCardsDrop,
  hook,
  onDragTouch,
}: Props) => {
  const onClick: MouseEventHandler = () => {
    hook.drawCard();
  };

  const handleCardDrop: HandleCardDrop = (card, from) => {
    handleCardsDrop([card], from);
  };

  const handleAutoCardDrop: HandleCardDrop = (card, from) => {
    handleAutoCardsDrop([card], from);
  };

  const faceUpToReveal = hook.faceUpCards.slice(-3);

  return (
    <div className="flex md:flex-row flex-col w-full">
      <div className="p-5 md:w-[33%]" onClick={onClick}>
        {hook.faceDownCards.map((card, i) => (
          <Card
            card={card}
            canDrag={false}
            className={"absolute "}
            position={{ x: i * 2, y: 1 }}
            pile={name}
            showCard={false}
            onTouch={onDragTouch}
          />
        ))}
      </div>
      <div className="p-5 md:mt-0 mt-20">
        {faceUpToReveal.map((card, i) => (
          <Card
            card={card}
            canDrag={i == faceUpToReveal.length - 1}
            className={"absolute "}
            position={{ x: i * 3, y: 0 }}
            setIsDragging={setIsDragging}
            handleCardDrop={handleCardDrop}
            handleAutoCardDrop={handleAutoCardDrop}
            pile={name}
            showCard
            draggingClassName={"z-30"}
            onTouch={onDragTouch}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawPile;
