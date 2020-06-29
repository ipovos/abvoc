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
    recordsCount: 0,
    learnedRecordsCount: 0,
    lastRepetition: null,
    nextRepetition: null,
    iteration: 0,
    status: 'inProgress',
  };
};

const createRecord = ({
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

const isRecordLearned = (record) => {
  return false;
};

export class App extends React.Component {
  emptyVocabulary = {
    appData: {
      decksCount: 0,
      learnedDecksCount: 0,
      recordsCount: 0,
      learnedRecordsCount: 0,
    },
    // for the sake of search
    decksById: {},
    recordsById: {},
    // one to one
    recordsIdsByDeckId: {},
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
      recordsById,
      recordsIdsByDeckId,
    } = this.state;

    if (
      appData === prevState.appData &&
      decksById === prevState.decksById &&
      recordsById === prevState.recordsById &&
      recordsIdsByDeckId === prevState.recordsIdsByDeckId
    ) {
      return;
    }

    persistData(
      JSON.stringify({
        appData,
        decksById,
        recordsById,
        recordsIdsByDeckId,
      }),
    );
  }

  changePage = (page, pageParams) => {
    this.setState({ page, pageParams });
  };

  getRecordsByDeckId = (deckId) => {
    return this.state.recordsIdsByDeckId[deckId].map(
      (recordId) => this.state.recordsById[recordId],
    );
  };

  importData = (data) => {
    this.setState(JSON.parse(data));
  };

  exportData = () => {
    const {
      appData,
      decksById,
      recordsById,
      recordsIdsByDeckId,
    } = this.state;

    exportData(
      JSON.stringify({
        appData,
        decksById,
        recordsById,
        recordsIdsByDeckId,
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
        recordsIdsByDeckId: {
          ...prevState.recordsIdsByDeckId,
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
        [deck.id]: deletedDeckRecordsIds,
        ...restRecordsIdsByDeckId
      } = prevState.recordsIdsByDeckId;

      const getRecordsByIdWithouDeletedDeckRecords = () => {
        const recordsByIdCopy = {
          ...prevState.recordsById,
        };

        deletedDeckRecordsIds.forEach((recordId) => {
          delete recordsByIdCopy[recordId];
        });

        return recordsByIdCopy;
      };

      return {
        appData: {
          ...prevState.appData,
          decksCount: prevState.appData.decksCount - 1,
        },
        decksById: restDecksById,
        recordsIdsByDeckId: restRecordsIdsByDeckId,
        recordsById: getRecordsByIdWithouDeletedDeckRecords(),
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
          recordsCount: prevState.appData.recordsCount + 1,
        },
        decksById: {
          ...prevState.decksById,
          [deckId]: {
            ...prevState.decksById[deckId],
            recordsCount:
              prevState.decksById[deckId].recordsCount + 1,
          },
        },
        recordsById: {
          ...prevState.recordsById,
          [newRecord.id]: newRecord,
        },
        recordsIdsByDeckId: {
          ...prevState.recordsIdsByDeckId,
          [deckId]: prevState.recordsIdsByDeckId[
            deckId
          ].concat([newRecord.id]),
        },
      };
    });
  };

  deleteRecord = (record) => {
    this.setState((prevState) => {
      const { deckId } = record;

      const {
        [record.id]: deletedRecord,
        ...restRecordsById
      } = prevState.recordsById;

      return {
        appData: {
          ...prevState.appData,
          recordsCount: prevState.appData.recordsCount - 1,
          learnedRecordsCount: isRecordLearned(record)
            ? prevState.appData.learnedRecordsCount - 1
            : prevState.appData.learnedRecordsCount,
        },
        decksById: {
          ...prevState.decksById,
          [deckId]: {
            ...prevState.decksById[deckId],
            recordsCount:
              prevState.decksById[deckId].recordsCount - 1,
            learnedRecordsCount: isRecordLearned(record)
              ? prevState.decksById[deckId]
                  .learnedRecordsCount - 1
              : prevState.decksById[deckId]
                  .learnedRecordsCount,
          },
        },
        recordsById: restRecordsById,
        recordsIdsByDeckId: {
          ...prevState.recordsIdsByDeckId,
          [deckId]: prevState.recordsIdsByDeckId[
            deckId
          ].filter((id) => id !== record.id),
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
            records={this.getRecordsByDeckId(
              pageParams.deckId,
            )}
            onPageChange={this.changePage}
            onDeckDelete={this.deleteDeck}
            onRecordCreate={this.createRecord}
            onRecordDelete={this.deleteRecord}
          />
        )}
        {page === 'training' && (
          <TrainingPage
            router={router}
            deck={decksById[pageParams.deckId]}
            records={this.getRecordsByDeckId(
              pageParams.deckId,
            )}
            onPageChange={this.changePage}
          />
        )}
      </>
    );
  }
}
