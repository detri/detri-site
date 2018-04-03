import styled from 'styled-components';

const Branding = styled.a`
  display: inline-block;
  box-sizing: border-box;
  line-height: 2.25em;
  height: 100%;
  width: 6.5em;
  text-align: center;
  padding: 0 0.5em 0 0.5em;
  text-decoration: none;
  font-weight: bold;
  color: inherit;
  letter-spacing: 0.25em;
  transition: color 0.1s, background 0.3s;

  &:hover {
    background: #ee7272;
    color: #360000;
  }
`;

const NavLink = ({ to, children }) => {
  return (<Branding>
    {children}
  </Branding>);
};

export default NavLink;
