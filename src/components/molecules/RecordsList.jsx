import React from 'react';

import { ProgressBar } from '../atoms/ProgressBar';
import { Button } from '../atoms/Button';

import { colors } from '../../shared/styles';

export const RecordsList = ({ list, onRecordDelete }) => {
  return (
    <ul
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
    >
      {list.map((record, i) => (
        <li
          key={record.id}
          style={{
            padding: '1em',
            borderBottom:
              i === list.length - 1
                ? null
                : `1px solid ${colors.violet}`,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '1 1 auto' }}>
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                <b>{record.firstSide}</b>
              </p>
              <ProgressBar percent={20} />
              <p style={{ margin: 0, lineHeight: '1.5' }}>
                {record.secondSide}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '1em',
              }}
            >
              <Button
                onClick={() => onRecordDelete(record)}
              >
                Delete
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
