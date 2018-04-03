import styled from 'styled-components';

const TileContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
  flex-wrap: wrap;
`;

export default TileContainer;
