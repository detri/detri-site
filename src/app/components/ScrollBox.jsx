import React from 'react';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  height: 100%;
  width: ${props => props.width ? props.width : "100%"};
  margin-left: ${props => props.margin ? props.margin : "0"};
  margin-right: ${props => props.margin ? props.margin : "0"};
  overflow: hidden;
`;

const ScrollInner = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-right: 17px;
`;

const ScrollBox = ({ children, width, margin }) => {
  return (
    <ScrollContainer width={width} margin={margin}>
      <ScrollInner>
        {children}
      </ScrollInner>
    </ScrollContainer>
  );
};

export default ScrollBox;
