import React from 'react';
import {
  Column,
  Title
} from 'bloomer';

const FooterColumn = ({ title, children }) => {
  return (
    <Column>
      <Title isSize={6}><em>{title}</em></Title>
      {children}
    </Column>
  );
};

export default FooterColumn;
