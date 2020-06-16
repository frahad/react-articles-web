import '@material/react-layout-grid/dist/layout-grid.css'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #F9F9FB;
  }

  a {
    text-decoration: none;
  }

  button {
    font-family: 'Roboto', sans-serif;
  }
`

export default GlobalStyle
