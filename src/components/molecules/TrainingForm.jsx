import React from 'react';

import { Input } from '../atoms/Input';

import { ProgressBar } from '../atoms/ProgressBar';

import { calculatePercent } from '../../shared/utils';

export class TrainingForm extends React.Component {
  state = {
    value: '',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.targetValue === this.props.targetValue) {
      return;
    }

    this.setState({ value: '' });
  }

  handleValueChange = (event) => {
    const { value } = event.target;
    const { onSuccess } = this.props;

    if (this.getProgressPercent(value) === 100) {
      onSuccess();
    }

    this.setState({ value });
  };

  getProgressPercent = (value) => {
    const { targetValue } = this.props;

    const normalizedTargetValue = this.normalizeValue(
      targetValue,
    );
    const normalizedValue = this.normalizeValue(value);

    if (
      !normalizedTargetValue.startsWith(normalizedValue)
    ) {
      return 0;
    }

    return calculatePercent(
      normalizedValue.length,
      normalizedTargetValue.length,
    );
  };

  normalizeValue = (value = '') => {
    return value.toLowerCase();
  };

  render() {
    const {
      caption,
      targetValue,
      onSuccess,
      ...otherProps
    } = this.props;
    const { value } = this.state;

    const progressPercent = this.getProgressPercent(value);

    return (
      <>
        <div>
          <i>{caption}</i>
        </div>
        <br />
        <Input
          type="text"
          placeholder="type here..."
          value={value}
          onChange={this.handleValueChange}
          autoFocus
          {...otherProps}
        />
        <br />
        <div style={{ marginTop: '2px' }}>
          <ProgressBar
            percent={progressPercent}
            height="5px"
            colored
          />
        </div>
        <br />
      </>
    );
  }
}
