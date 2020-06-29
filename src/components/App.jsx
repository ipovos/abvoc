import React from 'react';

import {
  exportData,
  persistData,
  restoreData,
} from '../features/persistence';
import {
  createDeck,
  createRecord,
  isDeckLearned,
  isRecordLearned,
} from '../features/entities';

import { DecksPage } from './organisms/DecksPage';
import { DeckPage } from './organisms/DeckPage';
import { TrainingPage } from './organisms/TrainingPage';

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
    const { appData, decksById, recordsById } = this.state;

    if (
      appData === prevState.appData &&
      decksById === prevState.decksById &&
      recordsById === prevState.recordsById
    ) {
      return;
    }

    persistData(
      JSON.stringify({
        appData,
        decksById,
        recordsById,
      }),
    );
  }

  changePage = (page, pageParams) => {
    this.setState({ page, pageParams });
  };

  importData = (data) => {
    this.setState(JSON.parse(data));
  };

  exportData = () => {
    const { appData, decksById, recordsById } = this.state;

    exportData(
      JSON.stringify({
        appData,
        decksById,
        recordsById,
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
      };
    });
  };

  deleteDeck = (deck) => {
    this.setState((prevState) => {
      const {
        [deck.id]: deletedDeck,
        ...restDecksById
      } = prevState.decksById;

      const getRecordsByIdWithoutDeck = () => {
        const recordsByIdCopy = {
          ...prevState.recordsById,
        };

        deck.recordsIds.forEach((recordId) => {
          delete recordsByIdCopy[recordId];
        });

        return recordsByIdCopy;
      };

      return {
        appData: {
          ...prevState.appData,

          decksCount: prevState.appData.decksCount - 1,
          learnedDecksCount: isDeckLearned(deck)
            ? prevState.appData.learnedDecksCount - 1
            : prevState.appData.learnedDecksCount,

          recordsCount:
            prevState.appData.recordsCount -
            deck.recordsIds.length,
          learnedRecordsCount:
            prevState.appData.learnedRecordsCount -
            deck.learnedRecordsIds.length,
        },
        decksById: restDecksById,
        recordsById: getRecordsByIdWithoutDeck(),
      };
    });
  };

  getRecordsByDeckId = (deckId) => {
    const { recordsIds } = this.state.decksById[deckId];

    return recordsIds.map(
      (recordId) => this.state.recordsById[recordId],
    );
  };

  getLearnedRecordsByDeckId = (deckId) => {
    const { learnedRecordsIds } = this.state.decksById[
      deckId
    ];

    return learnedRecordsIds.map(
      (recordId) => this.state.recordsById[recordId],
    );
  };

  createRecord = ({ firstSide, secondSide, deckId }) => {
    const newRecord = createRecord({
      firstSide,
      secondSide,
      deckId,
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

            recordsIds: prevState.decksById[
              deckId
            ].recordsIds.concat([newRecord.id]),
          },
        },
        recordsById: {
          ...prevState.recordsById,
          [newRecord.id]: newRecord,
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

            recordsIds: prevState.decksById[
              deckId
            ].recordsIds.filter((id) => id !== record.id),
            learnedRecordsIds: prevState.decksById[
              deckId
            ].learnedRecordsIds.filter(
              (id) => id !== record.id,
            ),
          },
        },
        recordsById: restRecordsById,
      };
    });
  };

  updateRecords = (deck, records) => {
    const updatedRecords = records.map((record) => ({
      ...record,
      lastRepetition: new Date().toISOString(),
      iteration: record.iteration + 1,
    }));

    const prevLearnedRecordsCount = records.filter(
      isRecordLearned,
    ).length;
    const learnedRecordsCount = updatedRecords.filter(
      isRecordLearned,
    ).length;

    const learnedRecordsCountChange =
      learnedRecordsCount - prevLearnedRecordsCount;

    const learnedUpdatedRecordsIds = updatedRecords
      .filter(isRecordLearned)
      .map((record) => record.id);

    const updatedRecordsById = Object.fromEntries(
      updatedRecords.map((record) => [record.id, record]),
    );

    this.setState((prevState) => {
      const newRecordsById = {
        ...prevState.recordsById,
        ...updatedRecordsById,
      };

      const newDecksById = {
        ...prevState.decksById,
        [deck.id]: {
          ...prevState.decksById[deck.id],

          learnedRecordsIds: learnedUpdatedRecordsIds.reduce(
            (prevLearnedRecordsIds, learnedRecordId) => {
              if (
                prevLearnedRecordsIds.includes(
                  learnedRecordId,
                )
              ) {
                return prevLearnedRecordsIds;
              }

              return prevLearnedRecordsIds.concat[
                learnedRecordId
              ];
            },
            prevState.decksById[deck.id].learnedRecordsIds,
          ),
        },
      };

      const hasNewLearnedDeck =
        deck.learnedRecordsIds !== deck.recordsIds &&
        newDecksById[deck.id].learnedRecordsIds ===
          newDecksById[deck.id].recordsCount;

      return {
        ...prevState,
        appData: {
          ...prevState.appData,

          learnedRecordsCount:
            prevState.appData.learnedRecordsCount +
            learnedRecordsCountChange,
          learnedDecksCount: hasNewLearnedDeck
            ? prevState.appData.learnedDecksCount + 1
            : prevState.appData.learnedDecksCount,
        },
        decksById: newDecksById,
        recordsById: newRecordsById,
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
            getRecordsByDeckId={this.getRecordsByDeckId}
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
            onFinishTraining={this.updateRecords}
          />
        )}
      </>
    );
  }
}
