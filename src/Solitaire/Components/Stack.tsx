import { CardType, HandleCardsDrop } from "./GameTable";
import { UseStack } from "../CustomHooks/useStack";
import Card, { HandleCardDrop } from "./Card";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  handleCardsDrop: HandleCardsDrop;
  handleAutoCardsDrop: HandleCardsDrop;
  highlightedStack: string | null;
  hook: UseStack;
  setIsDragging: (isDragging: boolean) => void;
  onDragTouch: (x: number, y: number) => void;
};

type GroupDrag = { x: number; y: number; z: string | null };

const Stack = ({
  name,
  handleCardsDrop,
  handleAutoCardsDrop,
  highlightedStack,
  hook,
  setIsDragging,
  onDragTouch,
}: Props) => {
  const { cards } = hook;
  const getBorderColour: () => string = () => {
    return highlightedStack === name ? "bg-amber-200 bg-opacity-50" : "";
  };

  const [positions, setPositions] = useState<GroupDrag[]>([]);

  useEffect(() => {
    setPositions(cards.map((c, i) => ({ x: 10, y: i * 15, z: null })));
  }, [cards]);

  const cardsToMove: (card: CardType) => CardType[] = (card) => {
    setPositions(cards.map((c, i) => ({ x: 10, y: i * 15, z: null })));
    const indexOfCard = cards.indexOf(card);
    return cards.slice(indexOfCard);
  };

  const handleDrop: HandleCardDrop = (card, from) => {
    const toMove = cardsToMove(card);
    handleCardsDrop(toMove, from);
  };

  const handleAutoDrop: HandleCardDrop = (card, from) => {
    const toMove = cardsToMove(card);
    handleAutoCardsDrop(toMove, from);
  };

  const onDrag: (card: CardType, x: number, y: number) => void = (
    card,
    x,
    y
  ) => {
    const cardIndex = cards.indexOf(card);
    setPositions((curr) => {
      const update = [...curr];
      let j = 0;
      for (let i = cardIndex; i < cards.length; i++, j++) {
        update[i] = { x, y: y + j * 15, z: j === 0 ? "z-40" : "z-50" };
      }

      return update;
    });
  };

  return (
    <div
      ref={hook.ref}
      className={"p-5 md:h-full md:w-[14.2%] w-[22%] h-56 " + getBorderColour()}
      onMouseEnter={hook.onMouseEnter}
      onMouseLeave={hook.onMouseLeave}
      id={name}
    >
      {cards.map((card, i) => (
        <Card
          card={card}
          canDrag={card.show}
          className={"absolute "}
          position={positions[i]}
          setIsDragging={setIsDragging}
          handleCardDrop={handleDrop}
          handleAutoCardDrop={handleAutoDrop}
          pile={name}
          revealCard={hook.showCard}
          showCard={card.show}
          onDragging={onDrag}
          draggingClassName={positions[i]?.z ?? ""}
          onTouch={onDragTouch}
        />
      ))}
    </div>
  );
};

export default Stack;
