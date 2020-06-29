import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';

import { SearchForm } from '../molecules/SearchForm';
import { AppTile } from '../molecules/AppTile';
import { DeckTile } from '../molecules/DeckTile';
import { NotFoundTile } from '../molecules/NotFoundTile';

export class DecksPage extends React.Component {
  state = {
    hasValidationError: false,
    validationError: '',
    query: '',
  };

  onQueryChange = (event) => {
    const normalizedQuery = this.normalizeQuery(
      event.target.value,
    );
    const hasValidationError = this.validateQuery(
      normalizedQuery,
    );

    this.setState({
      hasValidationError,
      query: normalizedQuery,
      validationError: hasValidationError
        ? 'need more letters'
        : '',
    });
  };

  normalizeQuery = (rawQuery) => {
    return rawQuery.trim();
  };

  validateQuery = (query) => {
    return query.length > 0 && query.length < 2;
  };

  getFilteredDecks = () => {
    const { hasValidationError, query } = this.state;
    const { decks } = this.props;

    if (hasValidationError) {
      console.log('error');

      return decks;
    }

    return decks.filter((deck) => {
      return deck.title
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  };

  render() {
    const { appData, onPageChange } = this.props;
    const { query, validationError } = this.state;
    const filteredDecks = this.getFilteredDecks();

    return (
      <Container>
        <AppTile appData={appData} />
        <Tile>
          <SearchForm
            caption="to search sets"
            value={query}
            onChange={this.onQueryChange}
            validationError={validationError}
          />
        </Tile>

        {filteredDecks.map((deck) => (
          <DeckTile
            key={deck.id}
            deck={deck}
            onPageChange={() =>
              onPageChange('deck', {
                deckId: deck.id,
              })
            }
          />
        ))}
        {filteredDecks?.length === 0 && (
          <NotFoundTile
            caption={
              <>
                oops, no “
                <mark
                  style={{ backgroundColor: '#F3D34A' }}
                >
                  {query}
                </mark>
                ” decks found
              </>
            }
          />
        )}
      </Container>
    );
  }
}
