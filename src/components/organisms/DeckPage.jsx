import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { Button } from '../atoms/Button';
import { ProgressBar } from '../atoms/ProgressBar';

import { SearchForm } from '../molecules/SearchForm';
import { WordsList } from '../molecules/WordsList';

import { calculatePercent } from '../../shared/utils';

export class DeckPage extends React.Component {
  state = {
    query: '',
  };

  onQueryChange = (event) => {
    this.setState({ query: event.target.value });
  };

  getFilteredWords = () => {
    const { query } = this.state;
    const { words } = this.props;

    if (query.length < 2) {
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
    const { deck } = this.props;
    const { title, learnedWordsCount, wordsCount } = deck;

    return (
      <Container>
        <Tile>
          <Title>{title}</Title>
          <ProgressBar
            percent={calculatePercent(
              learnedWordsCount,
              wordsCount,
            )}
          />
          <p>
            {learnedWordsCount}/{wordsCount} words learned
          </p>
          <Button
            onClick={() => this.props.onPageChange('decks')}
          >
            Back!
          </Button>
        </Tile>
        <p>
          <Button wide look="purple">
            train
          </Button>
        </p>
        <Tile>
          <SearchForm
            caption="to search words"
            value={this.state.query}
            onChange={this.onQueryChange}
          />
        </Tile>
        <Tile noPadding>
          <WordsList list={this.getFilteredWords()} />
        </Tile>
      </Container>
    );
  }
}
