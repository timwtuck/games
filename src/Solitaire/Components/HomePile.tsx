import Card, { HandleCardDrop } from "./Card";
import { HandleCardsDrop } from "./GameTable";
import { UseHomePile } from "../CustomHooks/useHomePile";

type Props = {
  name: string;
  highlightedStack: string | null;
  setIsDragging: (isDragging: boolean) => void;
  handleCardsDrop: HandleCardsDrop;
  hook: UseHomePile;
};

const HomePile = ({
  name,
  highlightedStack,
  setIsDragging,
  handleCardsDrop,
  hook,
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
      className={"p-5 md:w-[25%] w-28 h-44 " + getBorderColour()}
      onMouseEnter={hook.onMouseEnter}
      onMouseLeave={hook.onMouseLeave}
    >
      <img
        className="absolute p-1 md:w-[9%] w-[20%]"
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
        />
      ))}
    </div>
  );
};

export default HomePile;
