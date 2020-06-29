import React from 'react';

import { getDeckLearningProgress } from '../../features/entities';

import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';
import { Button } from '../atoms/Button';

export const DeckTile = ({
  deck,
  records,
  pageChangeCaption,
  onPageChange,
  onDeckDelete,
}) => {
  const { title, recordsIds, learnedRecordsIds } = deck;

  return (
    <Tile>
      <Title>{title}</Title>
      <ProgressBar
        percent={getDeckLearningProgress(records)}
      />
      <p>
        {learnedRecordsIds.length}/{recordsIds.length}{' '}
        records learned
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
