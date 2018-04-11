import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 1.75em;
  border: 3px solid;
  border-radius: 0.33em;
  border-color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.primary};
  padding-left: 0.5em;
  color: ${props => props.theme.light};

  &:focus {
    border-color: ${props => props.theme.light};
    transition: border-color 0.5s ease-out;
    box-shadow: 0px 0px 5px 1px black;
  }
`;

export default Input;
