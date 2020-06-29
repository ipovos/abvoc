import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Button } from '../atoms/Button';
import { Mark } from '../atoms/Mark';

import { SearchForm } from '../molecules/SearchForm';
import { RecordsList } from '../molecules/RecordsList';

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

  onSearchKeyUp = (event) => {
    if (
      event.keyCode === 13 &&
      !this.state.hasValidationError &&
      this.state.query.length > 0 &&
      !this.state.isRecordCreating &&
      this.getFilteredRecords().length === 0
    ) {
      this.startRecordCreating();
    }
  };

  getFilteredRecords = () => {
    const { hasValidationError, query } = this.state;
    const { records } = this.props;

    if (hasValidationError) {
      return records;
    }

    return records
      .filter((record) => {
        return (
          record.firstSide
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          record.secondSide
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (a.createrAt < b.createdAt) {
          return 1;
        }

        return -1;
      });
  };

  render() {
    const {
      deck,
      records,
      onPageChange,
      onDeckDelete,
      onRecordDelete,
    } = this.props;
    const {
      validationError,
      query,
      isRecordCreating,
    } = this.state;
    const filteredRecords = this.getFilteredRecords();

    return (
      <Container>
        <DeckTile
          deck={deck}
          records={records}
          pageChangeCaption="Back"
          onPageChange={() => onPageChange('decks', null)}
          onDeckDelete={(deck) => {
            onPageChange('decks', null);
            onDeckDelete(deck);
          }}
        />
        <p
          style={{
            opacity: records.length === 0 ? 0.5 : 1,
          }}
        >
          <Button
            wide
            look="purple"
            onClick={() =>
              onPageChange('training', { deckId: deck.id })
            }
            disabled={records.length === 0}
          >
            train
          </Button>
        </p>
        <Tile>
          <SearchForm
            caption="to search or create records"
            value={query}
            onChange={this.onQueryChange}
            validationError={validationError}
            onKeyUp={this.onSearchKeyUp}
          />
        </Tile>

        {filteredRecords.length === 0 && query.length > 0 && (
          <NotFoundTile
            caption={
              <>
                {!isRecordCreating && (
                  <>
                    <div>
                      oops, no “<Mark>{query}</Mark>
                      ”-containing records found
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

        {filteredRecords.length > 0 && (
          <Tile noPadding>
            <RecordsList
              list={filteredRecords}
              onRecordDelete={onRecordDelete}
            />
          </Tile>
        )}
      </Container>
    );
  }
}
