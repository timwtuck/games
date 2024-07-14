import { CardType } from "../Components/GameTable";

type Deck = {
  draw: CardType[];
  stack1: CardType[];
  stack2: CardType[];
  stack3: CardType[];
  stack4: CardType[];
  stack5: CardType[];
  stack6: CardType[];
  stack7: CardType[];
};

export const generateDeck: () => Deck = () => {
  const allCards: { suit: string; value: string }[] = [
    { suit: "hearts", value: "2" },
    { suit: "hearts", value: "3" },
    { suit: "hearts", value: "4" },
    { suit: "hearts", value: "5" },
    { suit: "hearts", value: "6" },
    { suit: "hearts", value: "7" },
    { suit: "hearts", value: "8" },
    { suit: "hearts", value: "9" },
    { suit: "hearts", value: "10" },
    { suit: "hearts", value: "jack" },
    { suit: "hearts", value: "queen" },
    { suit: "hearts", value: "king" },
    { suit: "hearts", value: "ace" },
    { suit: "diamonds", value: "2" },
    { suit: "diamonds", value: "3" },
    { suit: "diamonds", value: "4" },
    { suit: "diamonds", value: "5" },
    { suit: "diamonds", value: "6" },
    { suit: "diamonds", value: "7" },
    { suit: "diamonds", value: "8" },
    { suit: "diamonds", value: "9" },
    { suit: "diamonds", value: "10" },
    { suit: "diamonds", value: "jack" },
    { suit: "diamonds", value: "queen" },
    { suit: "diamonds", value: "king" },
    { suit: "diamonds", value: "ace" },
    { suit: "spades", value: "2" },
    { suit: "spades", value: "3" },
    { suit: "spades", value: "4" },
    { suit: "spades", value: "5" },
    { suit: "spades", value: "6" },
    { suit: "spades", value: "7" },
    { suit: "spades", value: "8" },
    { suit: "spades", value: "9" },
    { suit: "spades", value: "10" },
    { suit: "spades", value: "jack" },
    { suit: "spades", value: "queen" },
    { suit: "spades", value: "king" },
    { suit: "spades", value: "ace" },
    { suit: "clubs", value: "2" },
    { suit: "clubs", value: "3" },
    { suit: "clubs", value: "4" },
    { suit: "clubs", value: "5" },
    { suit: "clubs", value: "6" },
    { suit: "clubs", value: "7" },
    { suit: "clubs", value: "8" },
    { suit: "clubs", value: "9" },
    { suit: "clubs", value: "10" },
    { suit: "clubs", value: "jack" },
    { suit: "clubs", value: "queen" },
    { suit: "clubs", value: "king" },
    { suit: "clubs", value: "ace" },
  ];

  const allCardsShow = allCards.map((card) => ({ ...card, show: true }));

  const cards = shuffle(allCardsShow);
  return {
    stack1: cards.splice(0, 1),
    stack2: cards.splice(0, 2),
    stack3: cards.splice(0, 3),
    stack4: cards.splice(0, 4),
    stack5: cards.splice(0, 5),
    stack6: cards.splice(0, 6),
    stack7: cards.splice(0, 7),
    draw: cards,
  };
};

const shuffle: (cards: CardType[]) => CardType[] = (cards) => {
  let currentIndex = cards.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }

  return cards;
};
