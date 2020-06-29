import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Button } from '../atoms/Button';
import { Mark } from '../atoms/Mark';

import { SearchForm } from '../molecules/SearchForm';
import { WordsList } from '../molecules/WordsList';

import { NotFoundTile } from '../molecules/NotFoundTile';
import { DeckTile } from '../molecules/DeckTile';
import { RecordCreatingForm } from '../molecules/RecordCreatingForm';

export class DeckPage extends React.Component {
  state = {
    hasValidationError: false,
    validationError: '',
    query: '',

    isRecordCreating: false,
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

      isRecordCreating: false,
    });
  };

  normalizeQuery = (rawQuery) => {
    return rawQuery.trim();
  };

  validateQuery = (query) => {
    return query.length > 0 && query.length < 2;
  };

  startRecordCreating = () => {
    this.setState({ isRecordCreating: true });
  };

  finishRecordCreating = () => {
    this.setState({
      hasValidationError: false,
      query: '',
      validationError: '',

      isRecordCreating: false,
    });
  };

  createRecord = ({ firstSide, secondSide }) => {
    this.props.onRecordCreate({
      firstSide,
      secondSide,
      deckId: this.props.deck.id,
    });
    this.finishRecordCreating();
  };

  getFilteredWords = () => {
    const { hasValidationError, query } = this.state;
    const { words } = this.props;

    if (hasValidationError) {
      return words;
    }

    return words.filter((word) => {
      return (
        word.firstSide
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        word.secondSide
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    });
  };

  render() {
    const {
      deck,
      words,
      onPageChange,
      onDeckDelete,
    } = this.props;
    const {
      validationError,
      query,
      isRecordCreating,
    } = this.state;
    const filteredWords = this.getFilteredWords();

    return (
      <Container>
        <DeckTile
          deck={deck}
          pageChangeCaption="Back"
          onPageChange={() => onPageChange('decks', null)}
          onDeckDelete={(deck) => {
            onPageChange('decks', null);
            onDeckDelete(deck);
          }}
        />
        <p
          style={{ opacity: words.length === 0 ? 0.5 : 1 }}
        >
          <Button
            wide
            look="purple"
            onClick={() =>
              onPageChange('training', { deckId: deck.id })
            }
            disabled={words.length === 0}
          >
            train
          </Button>
        </p>
        <Tile>
          <SearchForm
            caption="to search or create words"
            value={query}
            onChange={this.onQueryChange}
            validationError={validationError}
          />
        </Tile>

        {filteredWords.length === 0 && query.length > 0 && (
          <NotFoundTile
            caption={
              <>
                {!isRecordCreating && (
                  <>
                    <div>
                      oops, no “<Mark>{query}</Mark>
                      ”-containing words found
                    </div>
                    <br />
                  </>
                )}
                {isRecordCreating ? (
                  <RecordCreatingForm
                    initialFirstSide={query}
                    onRecordCreate={this.createRecord}
                  />
                ) : (
                  <Button
                    onClick={this.startRecordCreating}
                  >
                    Create “{query}” record
                  </Button>
                )}
              </>
            }
          />
        )}

        {filteredWords.length > 0 && (
          <Tile noPadding>
            <WordsList list={filteredWords} />
          </Tile>
        )}
      </Container>
    );
  }
}
