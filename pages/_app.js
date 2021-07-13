import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/aluraCommons'

const GlobalStyle = createGlobalStyle`
  // Reset CSS
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #D9E6F6;
    font-family: sans-serif;
  }

  img {
    display: block;
    height: auto;
    max-width: 100%;
  }

  #__next {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
