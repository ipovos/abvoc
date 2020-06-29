import { createID } from '../shared/utils';

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
    iteration: 0,
  };
};

export const isRecordLearned = (record) => {
  return false;
};

export const isDeckLearned = (deck) => {
  return false;
};
