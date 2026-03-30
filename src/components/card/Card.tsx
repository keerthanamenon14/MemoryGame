import React from 'react';

type Props = {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
};

export const Card: React.FC<Props> = ({ value, isFlipped, isMatched, onClick }) => {
  return (
    <div className={`card w-20 h-20 ${isFlipped || isMatched ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        {/* Front */}
        <div className="card-face card-front text-lg font-semibold text-gray-800">
          {value}
        </div>

        {/* Back */}
        <div className="card-face card-back">
          •
        </div>
      </div>
    </div>
  );
};