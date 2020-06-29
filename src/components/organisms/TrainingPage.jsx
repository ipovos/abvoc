import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';
import { Button } from '../atoms/Button';

import { TrainingForm } from '../molecules/TrainingForm';

import { calculatePercent } from '../../shared/utils';
import chime from '../../shared/chime.mp3';
import positiveAlert from '../../shared/positiveAlert.mp3';

export class TrainingPage extends React.Component {
  state = {
    isFinished: false,
    currentRecordIndex: 0,
  };

  recordSuccessAudio = React.createRef();
  trainingSuccessAudio = React.createRef();

  onSuccessInput = () => {
    const { records } = this.props;
    const { currentRecordIndex } = this.state;

    if (currentRecordIndex === records.length - 1) {
      this.finishTraining();
      return;
    }

    this.nextRecord();
  };

  nextRecord = () => {
    this.playRecordSuccessAudio();
    this.setState((state) => ({
      currentRecordIndex: state.currentRecordIndex + 1,
    }));
  };

  finishTraining = () => {
    this.playTrainingSuccessAudio();
    this.setState((state) => ({
      isFinished: true,
      currentRecordIndex: state.currentRecordIndex + 1,
    }));
    this.props.onFinishTraining(
      this.props.deck,
      this.props.records,
    );
  };

  playRecordSuccessAudio = () => {
    this.playAudio(this.recordSuccessAudio.current);
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
    const { deck, records, onPageChange } = this.props;
    const { isFinished, currentRecordIndex } = this.state;

    return (
      <Container>
        <Tile>
          <Title>{deck.title}</Title>
          <ProgressBar
            percent={calculatePercent(
              currentRecordIndex,
              records.length,
            )}
          />
          <br />

          {!isFinished && (
            <>
              <div>
                {currentRecordIndex}/{records.length}{' '}
                records learned
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
                {records[currentRecordIndex].firstSide}
              </Title>
            </Tile>
            <Tile>
              <TrainingForm
                caption="enter translation of the record above"
                targetValue={
                  records[currentRecordIndex].secondSide
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

        <div style={{ position: 'absolute' }}>
          <audio
            ref={this.recordSuccessAudio}
            src={chime}
          />
          <audio
            ref={this.trainingSuccessAudio}
            src={positiveAlert}
          />
        </div>
        <p>
          Sound effects obtained from{' '}
          <a
            href="https://www.zapsplat.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.zapsplat.com
          </a>
        </p>
      </Container>
    );
  }
}
