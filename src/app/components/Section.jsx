import styled from 'styled-components';

const Section = styled.section`
  background: ${props => props.theme.primary};;
  padding-top: 2.25em;
  width: 100%;
  height: calc(100% - 2.25em);
  color: inherit;
  overflow: hidden;
`;

export default Section;
