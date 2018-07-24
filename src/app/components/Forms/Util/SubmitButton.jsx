import styled from 'styled-components';

const SubmitButton = styled.button`
  margin-top: 0.5em;
  display: block;
  padding: 0.75em;
  line-height: 0.25em;
  height: 2em;
  border-radius: 0.33em;
  border-width: 3px;
  border-color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.light};

  &:hover {
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.7);
  }
`;

export default SubmitButton;
