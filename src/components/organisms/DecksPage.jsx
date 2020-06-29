import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Mark } from '../atoms/Mark';

import { SearchForm } from '../molecules/SearchForm';
import { AppTile } from '../molecules/AppTile';
import { DeckTile } from '../molecules/DeckTile';
import { NotFoundTile } from '../molecules/NotFoundTile';
import { Button } from '../atoms/Button';

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

  onFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      console.log(JSON.parse(event.target.result));
    };

    if (event.target.files.length > 0) {
      reader.readAsText(event.target.files[0]);
    }
  };

  onDeckCreate = () => {
    this.props.onDeckCreate(this.state.query);
    this.setState({
      hasValidationError: false,
      validationError: '',
      query: '',
    });
  };

  onSearchKeyUp = (event) => {
    if (
      event.keyCode === 13 &&
      !this.state.hasValidationError &&
      this.state.query.length > 0 &&
      this.getFilteredDecks().length === 0
    ) {
      this.onDeckCreate();
    }
  };

  getFilteredDecks = () => {
    const { hasValidationError, query } = this.state;
    const { decks } = this.props;

    if (hasValidationError) {
      return decks;
    }

    return decks.filter((deck) => {
      return deck.title
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  };

  render() {
    const {
      appData,
      onPageChange,
      onDataImport,
      onDataExport,
      onDataReset,
      onDeckDelete,
      getRecordsByDeckId,
    } = this.props;
    const { validationError, query } = this.state;
    const filteredDecks = this.getFilteredDecks();

    return (
      <Container>
        <AppTile
          appData={appData}
          onDataImport={onDataImport}
          onDataExport={onDataExport}
          onDataReset={onDataReset}
        />

        <Tile>
          <SearchForm
            caption="to search or create decks"
            value={query}
            onChange={this.onQueryChange}
            onKeyUp={this.onSearchKeyUp}
            validationError={validationError}
          />
        </Tile>

        {filteredDecks.length === 0 && query.length > 0 && (
          <NotFoundTile
            caption={
              <>
                <div>
                  oops, no “<Mark>{query}</Mark>
                  ”-containing decks found
                </div>
                <br />
                <Button onClick={this.onDeckCreate}>
                  Create “{query}” deck
                </Button>
              </>
            }
          />
        )}

        {filteredDecks.map((deck) => (
          <DeckTile
            key={deck.id}
            deck={deck}
            records={getRecordsByDeckId(deck.id)}
            pageChangeCaption="See deck"
            onPageChange={() =>
              onPageChange('deck', {
                deckId: deck.id,
              })
            }
            onDeckDelete={onDeckDelete}
          />
        ))}
      </Container>
    );
  }
}
