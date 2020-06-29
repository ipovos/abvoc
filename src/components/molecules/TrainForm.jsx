import React from 'react';

import { Input } from '../atoms/Input';

import { ProgressBar } from '../atoms/ProgressBar';

export class TrainForm extends React.Component {
  state = {
    value: '',
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };

  getProgressPercent = () => {
    const { targetValue } = this.props;
    const { value } = this.state;

    const normalizedTargetValue = this.normalizeValue(
      targetValue,
    );

    const normalizedValue = this.normalizeValue(value);

    if (
      !normalizedTargetValue.startsWith(normalizedValue)
    ) {
      return 0;
    }

    return (value.length / targetValue.length) * 100;
  };

  normalizeValue = (value) => {
    return value.toLowerCase();
  };

  render() {
    const { caption, ...otherProps } = this.props;
    const { value } = this.state;
    const progressPercent = this.getProgressPercent();

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
