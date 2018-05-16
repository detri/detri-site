import styled from 'styled-components';

const Section = styled.section`
  position: absolute;
  background: ${props => props.theme.primary};;
  width: calc(100% - 9em);
  left: 9em;
  height: calc(100% - 4.5em);
  color: inherit;
  overflow: hidden;
`;

export default Section;
