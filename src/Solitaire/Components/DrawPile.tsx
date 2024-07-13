import Draggable, { DraggableEventHandler } from "react-draggable";
import ReactDOM from "react-dom";
import { MouseEventHandler, useState } from "react";
import Card, { HandleCardDrop } from "./Card";
import { CardType, HandleCardsDrop } from "./GameTable";
import { UseDrawPile } from "../CustomHooks/useDrawPile";

type Props = {
  setIsDragging: (isDragging: boolean) => void;
  handleCardsDrop: HandleCardsDrop;
  hook: UseDrawPile;
};

const DrawPile = ({ setIsDragging, handleCardsDrop, hook }: Props) => {
  const onClick: MouseEventHandler = () => {
    hook.drawCard();
  };

  const handleCardDrop: HandleCardDrop = (card, from) => {
    handleCardsDrop([card], from);
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
            pile="drawPile"
            showCard={false}
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
            pile="drawPile"
            showCard
            draggingClassName={"z-30"}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawPile;
