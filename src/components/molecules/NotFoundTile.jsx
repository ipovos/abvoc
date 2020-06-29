import React from 'react';

import { Tile } from '../atoms/Tile';

export const NotFoundTile = ({ caption }) => {
  return (
    <Tile>
      <div>{caption}</div>
      {/* <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button>add word</Button>
        <Button>add set</Button>
      </div> */}
    </Tile>
  );
};
