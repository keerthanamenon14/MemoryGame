import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { GameBoard } from './GameBoard';

describe('GameBoard Component', () => {

  const mockCards = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    value: String.fromCharCode(65 + (i % 8)), // A-H pairs
    isFlipped: false,
    isMatched: false,
  }));

  test('renders 16 cards', () => {
    render(<GameBoard cards={mockCards} onFlip={() => {}} />);

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(16);
  });

  test('calls onFlip when a card is clicked', () => {
    const handleFlip = vi.fn();

    render(<GameBoard cards={mockCards} onFlip={handleFlip} />);

    const cards = screen.getAllByTestId('card');
    fireEvent.click(cards[0]);

    expect(handleFlip).toHaveBeenCalledTimes(1);
  });

  test('calls onFlip with correct index', () => {
    const handleFlip = vi.fn();

    render(<GameBoard cards={mockCards} onFlip={handleFlip} />);

    const cards = screen.getAllByTestId('card');
    fireEvent.click(cards[5]);

    expect(handleFlip).toHaveBeenCalledWith(5);
  });

});