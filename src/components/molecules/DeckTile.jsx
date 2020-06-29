import React from 'react';

import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';
import { Button } from '../atoms/Button';

import { calculatePercent } from '../../shared/utils';

export const DeckTile = ({ deck, onPageChange }) => {
  const { title, wordsCount, learnedWordsCount } = deck;

  return (
    <Tile>
      <Title>{title}</Title>
      <ProgressBar
        percent={calculatePercent(
          learnedWordsCount,
          wordsCount,
        )}
      />
      <p>
        {learnedWordsCount}/{wordsCount} words learned
      </p>
      <p>Learning in progress</p>
      <Button onClick={onPageChange}>Go!</Button>
    </Tile>
  );
};
