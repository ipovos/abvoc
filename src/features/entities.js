import {
  createID,
  calculatePercent,
} from '../shared/utils';

const REMEMBER_ITERATIONS = 5;

export const createDeck = (title) => {
  return {
    title,
    type: 'deck',
    id: createID(),
    recordsIds: [],
    learnedRecordsIds: [],
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
    status: 'inProgress',
  };
};

export const createRecord = ({
  firstSide,
  secondSide,
  deckId,
}) => {
  return {
    firstSide,
    secondSide,
    deckId,
    id: createID(),
    lastRepetition: null,
    nextRepetition: null,
    createdAt: new Date().toISOString(),
    iteration: 0,
  };
};

export const isRecordLearned = (record) => {
  return record.iteration > REMEMBER_ITERATIONS;
};

export const isDeckLearned = (deck) => {
  return false;
};

export const getRecordLearningProgress = (record) => {
  return calculatePercent(
    Math.min(record.iteration, REMEMBER_ITERATIONS),
    REMEMBER_ITERATIONS,
  );
};

export const getDeckLearningProgress = (deckRecords) => {
  const wordsIterationsInBoardsOfRemember = deckRecords
    .map((record) =>
      Math.min(record.iteration, REMEMBER_ITERATIONS),
    )
    .reduce((acc, number) => acc + number, 0);

  return calculatePercent(
    wordsIterationsInBoardsOfRemember,
    deckRecords.length * REMEMBER_ITERATIONS,
  );
};
