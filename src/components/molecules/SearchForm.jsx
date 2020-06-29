import React from 'react';

import { Input } from '../atoms/Input';

import { colors } from '../../shared/styles';

export const SearchForm = ({
  caption,
  validationError,
  ...otherProps
}) => {
  return (
    <>
      <div>
        <i>{caption}</i>
      </div>
      <br />
      <Input
        type="text"
        placeholder="type here..."
        {...otherProps}
      />
      <br />
      {validationError?.length > 0 ? (
        <div style={{ color: colors.red }}>
          <i>{validationError}</i>
        </div>
      ) : (
        <br />
      )}
    </>
  );
};
