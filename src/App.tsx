import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { flip, check, reset } from './features/game/gameSlice';
import { GameBoard } from './components/game/GameBoard';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { cards, flipped, message, moves } = useSelector((s: RootState) => s.game);

  useEffect(() => {
    if (flipped.length === 2) {
      const t = setTimeout(() => dispatch(check()), 700);
      return () => clearTimeout(t);
    }
  }, [flipped, dispatch]);

  const done = cards.every(c => c.isMatched);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-2">Memory Game</h1>

      <div className="text-sm text-gray-600 mb-4">
        Moves: {moves} {message && `| ${message}`}
      </div>

      <GameBoard cards={cards} onFlip={(i: number) => dispatch(flip(i))} />

      {done && (
        <div className="mt-4 text-green-600 font-medium">
          🎉 All pairs matched!
        </div>
      )}

      <button
        onClick={() => dispatch(reset())}
        className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Restart Game
      </button>
    </div>
  );
};

export default App;