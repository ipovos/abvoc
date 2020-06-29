import React from 'react';

import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export class RecordCreatingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstSide: props.initialFirstSide,
      secondSide: '',
    };
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onInputKeyUp = (event) => {
    if (
      event.keyCode === 13 &&
      this.state.firstSide.length > 0 &&
      this.state.secondSide.length > 0
    ) {
      this.createRecord();
    }
  };

  createRecord = () => {
    const { firstSide, secondSide } = this.state;
    this.props.onRecordCreate({ firstSide, secondSide });
  };

  render() {
    const { firstSide, secondSide } = this.state;
    const isDisabled =
      firstSide.length === 0 || secondSide.length === 0;

    return (
      <>
        <div>
          <i>create record</i>
        </div>
        <br />
        <label
          style={{ display: 'block' }}
          htmlFor="firstSide"
        >
          First side
        </label>
        <Input
          type="text"
          placeholder="type here..."
          name="firstSide"
          id="firstSide"
          value={firstSide}
          onChange={this.onInputChange}
          onKeyUp={this.onInputKeyUp}
        />
        <br />
        <label
          style={{ display: 'block' }}
          htmlFor="secondSide"
        >
          Second side
        </label>
        <Input
          type="text"
          placeholder="type here..."
          name="secondSide"
          id="secondSide"
          value={secondSide}
          onChange={this.onInputChange}
          onKeyUp={this.onInputKeyUp}
          autoFocus
        />
        <br />
        <div>
          <Button
            disabled={isDisabled}
            onClick={this.createRecord}
          >
            Create record
          </Button>
        </div>
        {isDisabled ? (
          <>
            <br />
            <div>
              <i>enter first and second side</i>
            </div>
          </>
        ) : (
          <br />
        )}
      </>
    );
  }
}
