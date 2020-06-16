import styled, { css } from 'styled-components'

const baseStyle = css`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: .25rem;

  &:focus {
    outline: 0;
  }
`

const Input = styled.input`
  ${baseStyle}
  height: calc(1.5em + .75rem + 2px);
`

Input.Multiline = styled.textarea`
  ${baseStyle}
`

Input.Label = styled.label`
  display: inline-block;
  margin-bottom: .5rem;
`

export default Input;
