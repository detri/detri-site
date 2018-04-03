import React from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ScrollInner = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-right: 17px;
`;

const ScrollBox = ({ children }) => {
  return (
    <ScrollContainer>
      <ScrollInner>
        {children}
      </ScrollInner>
    </ScrollContainer>
  );
};

export default ScrollBox;
