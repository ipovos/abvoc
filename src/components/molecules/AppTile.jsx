import React from 'react';

import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';

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
        percent={(learnedWordsCount / wordsCount) * 100}
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
