import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';
import { Button } from '../atoms/Button';

import { TrainingForm } from '../molecules/TrainingForm';

import { calculatePercent } from '../../shared/utils';

export class TrainingPage extends React.Component {
  state = {
    isFinished: false,
    currentWordIndex: 0,
  };

  wordSuccessAudio = React.createRef();
  trainingSuccessAudio = React.createRef();

  onSuccessInput = () => {
    const { words } = this.props;
    const { currentWordIndex } = this.state;

    if (currentWordIndex === words.length - 1) {
      this.finishTraining();
      return;
    }

    this.nextWord();
  };

  nextWord = () => {
    this.playWordSuccessAudio();
    this.setState((state) => ({
      currentWordIndex: state.currentWordIndex + 1,
    }));
  };

  finishTraining = () => {
    this.playTrainingSuccessAudio();
    this.setState((state) => ({
      isFinished: true,
      currentWordIndex: state.currentWordIndex + 1,
    }));
  };

  playWordSuccessAudio = () => {
    this.playAudio(this.wordSuccessAudio.current);
  };

  playTrainingSuccessAudio = () => {
    this.playAudio(this.trainingSuccessAudio.current);
  };

  playAudio = (audio) => {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };

  render() {
    const { deck, words, onPageChange } = this.props;
    const { isFinished, currentWordIndex } = this.state;

    return (
      <Container>
        <Tile>
          <Title>{deck.title}</Title>
          <ProgressBar
            percent={calculatePercent(
              currentWordIndex,
              words.length,
            )}
          />
          <br />

          {!isFinished && (
            <>
              <div>
                {currentWordIndex}/{words.length} words
                learned
              </div>
              <br />
            </>
          )}
          <Button
            onClick={() =>
              onPageChange('deck', { deckId: deck.id })
            }
          >
            Back
          </Button>
        </Tile>

        {!isFinished ? (
          <>
            <Tile>
              <Title>
                {words[currentWordIndex].firstSide}
              </Title>
            </Tile>
            <Tile>
              <TrainingForm
                caption="enter translation of the word above"
                targetValue={
                  words[currentWordIndex].secondSide
                }
                onSuccess={this.onSuccessInput}
              />
            </Tile>
          </>
        ) : (
          <Tile>
            <Title>
              Congratulations! Training finished{' '}
              <span role="img" aria-label="trophy">
                🏆
              </span>
            </Title>
          </Tile>
        )}

        <video
          ref={this.wordSuccessAudio}
          src="/chime.mp3"
        />
        <video
          ref={this.trainingSuccessAudio}
          src="/positiveAlert.mp3"
        />
      </Container>
    );
  }
}
