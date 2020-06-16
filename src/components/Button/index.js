import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 0.02rem;
  padding: 0.55rem 1.5rem;
  border: 0;
  background-color: black;
  color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.95;
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.16);
    transform: translate3d(0px, -1px, 0px);
  }

  &:focus {
    outline: 0;
  }
`

export default Button
