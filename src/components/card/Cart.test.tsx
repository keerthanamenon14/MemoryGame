import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {

  test('renders card value', () => {
    render(
      <Card
        value="A"
        isFlipped={true}
        isMatched={false}
        onClick={() => {}}
      />
    );

    expect(screen.getByText('A')).toBeInTheDocument();
  });

  test('shows flipped class when isFlipped is true', () => {
    render(
      <Card
        value="A"
        isFlipped={true}
        isMatched={false}
        onClick={() => {}}
      />
    );

    const card = screen.getByTestId('card');
    expect(card.className).toContain('flipped');
  });

  test('shows flipped class when isMatched is true', () => {
    render(
      <Card
        value="A"
        isFlipped={false}
        isMatched={true}
        onClick={() => {}}
      />
    );

    const card = screen.getByTestId('card');
    expect(card.className).toContain('flipped');
  });

  test('does NOT show flipped class when not flipped or matched', () => {
    render(
      <Card
        value="A"
        isFlipped={false}
        isMatched={false}
        onClick={() => {}}
      />
    );

    const card = screen.getByTestId('card');
    expect(card.className).not.toContain('flipped');
  });

  test('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();

    render(
      <Card
        value="A"
        isFlipped={false}
        isMatched={false}
        onClick={handleClick}
      />
    );

    const card = screen.getByTestId('card');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});