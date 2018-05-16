import styled from 'styled-components';

const Navbar = styled.nav`
  height: calc(100% - 4.5em);
  width: 9em;
  background: ${props => props.theme.secondary};
  position: fixed;
  top: 0;
  left: 0;
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

export default Navbar;
