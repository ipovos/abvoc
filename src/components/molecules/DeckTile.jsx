import React from 'react';

import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';
import { Button } from '../atoms/Button';

import { calculatePercent } from '../../shared/utils';

export const DeckTile = ({
  deck,
  pageChangeCaption,
  onPageChange,
  onDeckDelete,
}) => {
  const { title, recordsCount, learnedRecordsCount } = deck;

  return (
    <Tile>
      <Title>{title}</Title>
      <ProgressBar
        percent={calculatePercent(
          learnedRecordsCount,
          recordsCount,
        )}
      />
      <p>
        {learnedRecordsCount}/{recordsCount} records learned
      </p>
      <p>Learning in progress</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button onClick={onPageChange}>
          {pageChangeCaption}
        </Button>
        <Button onClick={() => onDeckDelete(deck)}>
          Delete
        </Button>
      </div>
    </Tile>
  );
};
