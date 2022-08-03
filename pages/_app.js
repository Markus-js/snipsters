import { SessionProvider } from "next-auth/react"
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material/styles';
import 'styles/globals.scss'
import 'styles/colors.scss';
import { themeOptions } from "styles/theme";

function MyApp({ Component, pageProps, session }) {
  const darkTheme = createTheme(themeOptions);  

  return (
    <SessionProvider session={session}>
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
