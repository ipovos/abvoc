import React from 'react';

import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';

import { calculatePercent } from '../../shared/utils';

export const AppTile = ({ appData }) => {
  const {
    decksCount,
    learnedDecksCount,
    wordsCount,
    learnedWordsCount,
  } = appData;

  return (
    <Tile>
      <Title>Abvoc</Title>
      <ProgressBar
        percent={calculatePercent(
          learnedWordsCount,
          wordsCount,
        )}
      />
      <p>
        {learnedDecksCount}/{decksCount} decks learned
      </p>
      <p>
        {learnedWordsCount}/{wordsCount} words learned
      </p>
    </Tile>
  );
};
