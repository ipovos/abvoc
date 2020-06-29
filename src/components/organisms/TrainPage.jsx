import React from 'react';

import { Container } from '../atoms/Container';
import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';

import { TrainForm } from '../molecules/TrainForm';

export class TrainPage extends React.Component {
  render() {
    const { deck } = this.props;
    const targetValue = 'Father';

    return (
      <Container>
        <Tile>
          <Title>{deck.title}</Title>
          <ProgressBar percent={10} />
          <p>1/10 words learned</p>
        </Tile>
        <Tile>
          <Title>{targetValue}</Title>
        </Tile>
        <Tile>
          <TrainForm
            caption="enter translation of the word above"
            targetValue={targetValue}
          />
        </Tile>
      </Container>
    );
  }
}
