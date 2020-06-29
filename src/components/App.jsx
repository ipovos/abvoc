import React from 'react';

import { DecksPage } from './organisms/DecksPage';
import { DeckPage } from './organisms/DeckPage';
import { TrainingPage } from './organisms/TrainingPage';

export class App extends React.Component {
  emptyVocabulary = {
    appData: {
      decksCount: 0,
      learnedDecksCount: 0,
      wordsCount: 0,
      learnedWordsCount: 0,
    },
    decksById: {},
    wordsById: {},
    wordsIdsByDeckId: {},
  };

  state = {
    page: 'decks',
    pageParams: null,

    ...this.emptyVocabulary,
  };

  componentDidMount() {
    const persistedString = localStorage.getItem(
      'abvoc/state',
    );

    if (!persistedString) {
      return;
    }

    this.importData(persistedString);
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
      wordsIdsByDeckId === prevState.wordsById
    ) {
      return;
    }

    localStorage.setItem(
      'abvoc/state',
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

  onDataExport = () => {
    const {
      appData,
      decksById,
      wordsById,
      wordsIdsByDeckId,
    } = this.state;

    const vocabulary = JSON.stringify({
      appData,
      decksById,
      wordsById,
      wordsIdsByDeckId,
    });

    const dataString =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(vocabulary);

    const downloadAnchorElem = document.createElement('a');
    downloadAnchorElem.setAttribute('href', dataString);
    downloadAnchorElem.setAttribute(
      'download',
      `vocabulary-${new Date()
        .toISOString()
        .replace(/:/g, '_')}.json`,
    );
    downloadAnchorElem.click();
  };

  onDataReset = () => {
    this.setState(this.emptyVocabulary);
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
            onDataExport={this.onDataExport}
            onDataReset={this.onDataReset}
          />
        )}
        {page === 'deck' && (
          <DeckPage
            router={router}
            deck={decksById[pageParams.deckId]}
            words={this.getWordsByDeckId(pageParams.deckId)}
            onPageChange={this.changePage}
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
