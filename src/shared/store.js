export let appData = {
  decksCount: 2,
  learnedDecksCount: 0,
  wordsCount: 60,
  learnedWordsCount: 20,
};
export let decksById = {
  '1': {
    id: '1',
    type: 'deck',
    title: 'Fruits',
    wordsCount: 2,
    learnedWordsCount: 1,
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
    status: 'inProgress',
  },
  '2': {
    id: '2',
    type: 'deck',
    title: 'Family 1',
    wordsCount: 4,
    learnedWordsCount: 1,
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
    status: 'inProgress',
  },
};
export let wordsById = {
  '3': {
    id: '3',
    term: 'Pear',
    definition: 'Груша',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '4': {
    id: '4',
    term: 'Apple',
    definition: 'Яблуко',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '5': {
    id: '5',
    term: 'Father',
    definition: 'Батько',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '6': {
    id: '6',
    term: 'Mother',
    definition: 'Матір',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '7': {
    id: '7',
    term: 'Daughter',
    definition: 'Донька',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '8': {
    id: '8',
    term: 'Son',
    definition: 'Син',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '9': {
    id: '9',
    term: 'Sister',
    definition: 'Сестра',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
  '10': {
    id: '10',
    term: 'Brother',
    definition: 'Брат',
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
  },
};
export let wordsIdsByDeckId = {
  '1': ['3', '4'],
  '2': ['5', '6', '7', '8', '9', '10'],
};

window.data = {
  appData,
  decksById,
  wordsById,
  wordsIdsByDeckId,
};
