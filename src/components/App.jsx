import React from 'react';

import { DecksPage } from './organisms/DecksPage';
import { DeckPage } from './organisms/DeckPage';

import * as store from '../shared/store';

export class App extends React.Component {
  state = {
    page: 'decks',
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
    return (
      <>
        {this.state.page === 'decks' && (
          <DecksPage
            router={{ params: this.state.pageParams }}
            onPageChange={this.changePage}
            appData={this.state.appData}
            decks={Object.values(this.state.decksById)}
          />
        )}
        {this.state.page === 'deck' && (
          <DeckPage
            router={{ params: this.state.pageParams }}
            deck={
              this.state.decksById[
                this.state.pageParams.deckId
              ]
            }
            words={this.getWordsByDeckId(
              this.state.pageParams.deckId,
            )}
            onPageChange={this.changePage}
          />
        )}
      </>
    );
  }
}
