import React from 'react';

import { Tile } from '../atoms/Tile';
import { Title } from '../atoms/Title';
import { ProgressBar } from '../atoms/ProgressBar';

import { calculatePercent } from '../../shared/utils';
import { Button } from '../atoms/Button';

export class AppTile extends React.Component {
  fileInput = React.createRef();

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onload = (event) => {
      const { result } = event.target;
      const { onDataImport } = this.props;

      onDataImport(result);
    };
  }

  onFileChange = (event) => {
    const { files } = event.target;

    if (files.length > 0) {
      this.reader.readAsText(files[0]);
    }
  };

  onDataImportButtonClick = () => {
    this.fileInput.current.click();
  };

  render() {
    const {
      appData,
      onDataExport,
      onDataReset,
    } = this.props;

    const {
      decksCount,
      learnedDecksCount,
      recordsCount,
      learnedRecordsCount,
    } = appData;

    if (decksCount === 0) {
      return (
        <Tile>
          <Title>Abvoc</Title>
          <p>
            <i>Vocabulary is empty</i>
          </p>
          <input
            ref={this.fileInput}
            id="fileInput"
            type="file"
            accept="application/JSON"
            onChange={this.onFileChange}
            hidden
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              htmlFor="fileInput"
              onClick={this.onDataImportButtonClick}
              look="purple"
              wide
            >
              Import vocabulary
            </Button>
          </div>
        </Tile>
      );
    }

    return (
      <Tile>
        <Title>Abvoc</Title>
        <ProgressBar
          percent={calculatePercent(
            learnedRecordsCount,
            recordsCount,
          )}
        />
        <p>
          {learnedDecksCount}/{decksCount} decks learned
        </p>
        <p>
          {learnedRecordsCount}/{recordsCount} records learned
        </p>

        <input
          ref={this.fileInput}
          id="fileInput"
          type="file"
          accept="application/JSON"
          onChange={this.onFileChange}
          hidden
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            htmlFor="fileInput"
            onClick={this.onDataImportButtonClick}
          >
            Import vocabulary
          </Button>
          <Button onClick={onDataExport}>
            Export vocabulary
          </Button>
          <Button onClick={onDataReset}>Reset</Button>
        </div>
      </Tile>
    );
  }
}
