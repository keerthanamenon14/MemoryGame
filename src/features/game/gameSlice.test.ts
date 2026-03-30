import gameReducer, { flip, check, reset } from './gameSlice';
import { describe, test, expect } from 'vitest';

describe('gameSlice', () => {

  test('should flip a card', () => {
    const state = gameReducer(undefined, flip(0));
    expect(state.cards[0].isFlipped).toBe(true);
  });

  test('should not flip more than 2 cards', () => {
    let state = gameReducer(undefined, flip(0));
    state = gameReducer(state, flip(1));
    state = gameReducer(state, flip(2));

    expect(state.flipped.length).toBe(2);
  });

  test('should reset game', () => {
    let state = gameReducer(undefined, flip(0));
    state = gameReducer(state, reset());

    expect(state.moves).toBe(0);
    expect(state.flipped.length).toBe(0);
  });

  test('should match cards correctly', () => {
    let state = gameReducer(undefined, flip(0));
    state = gameReducer(state, flip(1));

    state = gameReducer(state, check());

    const [c1, c2] = state.cards;
    if (c1.value === c2.value) {
      expect(c1.isMatched).toBe(true);
      expect(c2.isMatched).toBe(true);
    }
  });

});