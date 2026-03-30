import { Card } from '../card/Card';

export const GameBoard = ({ cards, onFlip }) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map((c, i) => (
        <Card key={c.id} {...c} onClick={() => onFlip(i)} />
      ))}
    </div>
  );
};