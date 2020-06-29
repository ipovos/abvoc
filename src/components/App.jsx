import React from 'react';

import { DecksPage } from './organisms/DecksPage';
import { DeckPage } from './organisms/DeckPage';

import * as store from '../shared/store';

export class App extends React.Component {
  state = {
    page: 'train',
    pageParams: {
      deckId: '2',
    },
    appData: store.appData,
    decksById: store.decksById,
    wordsById: store.wordsById,
    wordsIdsByDeckId: store.wordsIdsByDeckId,
  };

  changePage = (page, pageParams) => {
    this.setState({ page, pageParams });
  };

  getWordsByDeckId = (deckId) => {
    return this.state.wordsIdsByDeckId[deckId].map(
      (wordId) => this.state.wordsById[wordId],
    );
  };

  render() {
    const {
      page,
      pageParams,
      appData,
      decksById,
    } = this.state;
    return (
      <>
        {page === 'decks' && (
          <DecksPage
            router={{ params: pageParams }}
            onPageChange={this.changePage}
            appData={appData}
            decks={Object.values(decksById)}
          />
        )}
        {page === 'deck' && (
          <DeckPage
            router={{ params: pageParams }}
            deck={decksById[pageParams.deckId]}
            words={this.getWordsByDeckId(pageParams.deckId)}
            onPageChange={this.changePage}
          />
        )}
      </>
    );
  }
}
