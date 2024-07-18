import Card, { HandleCardDrop } from "./Card";
import { HandleCardsDrop } from "./GameTable";
import { UseHomePile } from "../CustomHooks/useHomePile";
import React from "react";

type Props = {
  name: string;
  highlightedStack: string | null;
  setIsDragging: (isDragging: boolean) => void;
  handleCardsDrop: HandleCardsDrop;
  hook: UseHomePile;
  onDragTouch: (x: number, y: number) => void;
};

const HomePile = ({
  name,
  highlightedStack,
  setIsDragging,
  handleCardsDrop,
  hook,
  onDragTouch,
}: Props) => {
  const { cards } = hook;
  const handleCardDrop: HandleCardDrop = (card, from) => {
    handleCardsDrop([card], from);
  };

  const getBorderColour: () => string = () => {
    return highlightedStack === name ? "bg-amber-200 bg-opacity-50" : "";
  };

  const getBackground: () => string = () => "/images/suit_" + name + ".png";

  return (
    <div
      ref={hook.ref}
      className={"p-1 pt-5 md:w-[24%] w-28 " + getBorderColour()}
      onMouseEnter={hook.onMouseEnter}
      onMouseLeave={hook.onMouseLeave}
      id={name}
    >
      <img
        className="absolute md:w-[9%] w-[20%]"
        src={getBackground()}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      />
      {cards.map((card, i) => (
        <Card
          card={card}
          canDrag={i == cards.length - 1}
          className={"absolute "}
          position={{ x: 0, y: i * 3 }}
          setIsDragging={setIsDragging}
          handleCardDrop={handleCardDrop}
          pile={name}
          showCard
          onTouch={onDragTouch}
        />
      ))}
    </div>
  );
};

export default HomePile;
