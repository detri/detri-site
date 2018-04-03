import styled from 'styled-components';

const MusicBar = styled.footer`
  box-sizing: border-box;
  padding: 0.5em;
  height: 4.5em;
  width: 100%;
  background: ${props => props.theme.secondary};
  position: fixed;
  left: 0;
  bottom: 0;
`;

export default MusicBar;
