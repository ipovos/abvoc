import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Button } from '../atoms/Button';
import { Mark } from '../atoms/Mark';

import { SearchForm } from '../molecules/SearchForm';
import { WordsList } from '../molecules/WordsList';

import { NotFoundTile } from '../molecules/NotFoundTile';
import { DeckTile } from '../molecules/DeckTile';

export class DeckPage extends React.Component {
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

  getFilteredWords = () => {
    const { hasValidationError, query } = this.state;
    const { words } = this.props;

    if (hasValidationError) {
      return words;
    }

    return words.filter((word) => {
      return (
        word.term
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        word.definition
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    });
  };

  render() {
    const { deck, onPageChange } = this.props;
    const { validationError, query } = this.state;
    const filteredWords = this.getFilteredWords();

    return (
      <Container>
        <DeckTile
          deck={deck}
          pageChangeCaption="Back"
          onPageChange={() => onPageChange('decks', null)}
        />
        <p>
          <Button
            wide
            look="purple"
            onClick={() =>
              onPageChange('training', { deckId: deck.id })
            }
          >
            train
          </Button>
        </p>
        <Tile>
          <SearchForm
            caption="to search words"
            value={query}
            onChange={this.onQueryChange}
            validationError={validationError}
          />
        </Tile>
        {filteredWords?.length > 0 ? (
          <Tile noPadding>
            <WordsList list={filteredWords} />
          </Tile>
        ) : (
          <NotFoundTile
            caption={
              <>
                oops, no “<Mark>{query}</Mark>
                ”-containing words found
              </>
            }
          />
        )}
      </Container>
    );
  }
}
