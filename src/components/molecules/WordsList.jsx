import React from 'react';

import { ProgressBar } from '../atoms/ProgressBar';

import { colors } from '../../shared/styles';

export const WordsList = (props) => {
  return (
    <ul
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
    >
      {props.list.map((word, i) => (
        <li
          key={word.id}
          style={{
            padding: '1em',
            borderBottom:
              i === props.list.length - 1
                ? null
                : `1px solid ${colors.violet}`,
          }}
        >
          <div>
            <p style={{ margin: 0, lineHeight: '1.5' }}>
              <b>{word.term}</b>
            </p>
            <ProgressBar percent={20} />
            <p style={{ margin: 0, lineHeight: '1.5' }}>
              {word.definition}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
