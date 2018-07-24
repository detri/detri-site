import styled from 'styled-components';

const Content = styled.article`
  margin: 0 6.5em 0 6.5em;
  @media (max-width: 768px) {
    margin: 0;
  }
  background: ${props => props.theme.tertiary};
  height: 100%;
  color: ${props => props.theme.light};
`;

export default Content;
