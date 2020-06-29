import React from 'react';

import {
  exportData,
  persistData,
  restoreData,
} from '../features/persistence';

import { DecksPage } from './organisms/DecksPage';
import { DeckPage } from './organisms/DeckPage';
import { TrainingPage } from './organisms/TrainingPage';

const createID = () => {
  return `f${(~~(Math.random() * 1e8)).toString(16)}`;
};

const createDeck = (title) => {
  return {
    title,
    type: 'deck',
    id: createID(),
    wordsCount: 0,
    learnedWordsCount: 0,
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
    status: 'inProgress',
  };
};

const createRecord = ({ firstSide, secondSide }) => {
  return {
    firstSide,
    secondSide,
    id: createID(),
    status: 'inProgress',
  };
};

export class App extends React.Component {
  emptyVocabulary = {
    appData: {
      decksCount: 0,
      learnedDecksCount: 0,
      wordsCount: 0,
      learnedWordsCount: 0,
    },
    // for the sake of search
    decksById: {},
    wordsById: {},
    // one to one
    wordsIdsByDeckId: {},
  };

  state = {
    page: 'decks',
    pageParams: null,

    ...this.emptyVocabulary,
  };

  componentDidMount() {
    restoreData().then(this.importData);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      appData,
      decksById,
      wordsById,
      wordsIdsByDeckId,
    } = this.state;

    if (
      appData === prevState.appData &&
      decksById === prevState.decksById &&
      wordsById === prevState.wordsById &&
      wordsIdsByDeckId === prevState.wordsIdsByDeckId
    ) {
      return;
    }

    persistData(
      JSON.stringify({
        appData,
        decksById,
        wordsById,
        wordsIdsByDeckId,
      }),
    );
  }

  changePage = (page, pageParams) => {
    this.setState({ page, pageParams });
  };

  getWordsByDeckId = (deckId) => {
    return this.state.wordsIdsByDeckId[deckId].map(
      (wordId) => this.state.wordsById[wordId],
    );
  };

  importData = (data) => {
    this.setState(JSON.parse(data));
  };

  exportData = () => {
    const {
      appData,
      decksById,
      wordsById,
      wordsIdsByDeckId,
    } = this.state;

    exportData(
      JSON.stringify({
        appData,
        decksById,
        wordsById,
        wordsIdsByDeckId,
      }),
    );
  };

  resetData = () => {
    this.setState(this.emptyVocabulary);
  };

  createDeck = (title) => {
    const newDeck = createDeck(title);

    this.setState((prevState) => {
      return {
        appData: {
          ...prevState.appData,
          decksCount: prevState.appData.decksCount + 1,
        },
        decksById: {
          ...prevState.decksById,
          [newDeck.id]: newDeck,
        },
        wordsIdsByDeckId: {
          ...prevState.wordsIdsByDeckId,
          [newDeck.id]: [],
        },
      };
    });
  };

  deleteDeck = (deck) => {
    this.setState((prevState) => {
      const {
        [deck.id]: deletedDeck,
        ...restDecksById
      } = prevState.decksById;

      const {
        [deck.id]: deletedDeckWordsIds,
        ...restWordsIdsByDeckId
      } = prevState.wordsIdsByDeckId;

      const getWordsByIdWithouDeletedDeckWords = () => {
        const wordsByIdCopy = { ...prevState.wordsById };

        deletedDeckWordsIds.forEach((wordId) => {
          delete wordsByIdCopy[wordId];
        });

        return wordsByIdCopy;
      };

      return {
        appData: {
          ...prevState.appData,
          decksCount: prevState.appData.decksCount - 1,
        },
        decksById: restDecksById,
        wordsIdsByDeckId: restWordsIdsByDeckId,
        wordsById: getWordsByIdWithouDeletedDeckWords(),
      };
    });
  };

  createRecord = ({ firstSide, secondSide, deckId }) => {
    const newRecord = createRecord({
      firstSide,
      secondSide,
    });

    this.setState((prevState) => {
      return {
        appData: {
          ...prevState.appData,
          wordsCount: prevState.wordsCount + 1,
        },
        decksById: {
          ...prevState.decksById,
          [deckId]: {
            ...prevState.decksById[deckId],
            wordsCount:
              prevState.decksById[deckId].wordsCount + 1,
          },
        },
        wordsById: {
          ...prevState.wordsById,
          [newRecord.id]: newRecord,
        },
        wordsIdsByDeckId: {
          ...prevState.wordsIdsByDeckId,
          [deckId]: prevState.wordsIdsByDeckId[
            deckId
          ].concat([newRecord.id]),
        },
      };
    });
  };

  render() {
    const {
      page,
      pageParams,
      appData,
      decksById,
    } = this.state;

    const router = { params: pageParams };

    return (
      <>
        {page === 'decks' && (
          <DecksPage
            router={router}
            appData={appData}
            decks={Object.values(decksById)}
            onPageChange={this.changePage}
            onDataImport={this.importData}
            onDataExport={this.exportData}
            onDataReset={this.resetData}
            onDeckCreate={this.createDeck}
            onDeckDelete={this.deleteDeck}
          />
        )}
        {page === 'deck' && (
          <DeckPage
            router={router}
            deck={decksById[pageParams.deckId]}
            words={this.getWordsByDeckId(pageParams.deckId)}
            onPageChange={this.changePage}
            onDeckDelete={this.deleteDeck}
            onRecordCreate={this.createRecord}
          />
        )}
        {page === 'training' && (
          <TrainingPage
            router={router}
            deck={decksById[pageParams.deckId]}
            words={this.getWordsByDeckId(pageParams.deckId)}
            onPageChange={this.changePage}
          />
        )}
      </>
    );
  }
}
