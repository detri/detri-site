import styled from 'styled-components';

const Navbar = styled.nav`
  height: 2.25em;
  background: ${props => props.theme.secondary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-weight: bold;
  color: ${props => props.theme.light};
`;

export default Navbar;
