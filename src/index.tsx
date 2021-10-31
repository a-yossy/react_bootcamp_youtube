import React from "react";
import ReactDOM  from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RootRouter } from "Route";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import GlobalStyle from "GlobalStyle";
import { RecoilRoot } from "recoil";
import { AuthStateListener } from "providers/AuthStateListener";
import { GlobalAccount } from "providers/GlobalAccount";
import { ApolloProvider } from "providers/ApolloClient";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <ApolloProvider>
          <AuthStateListener>
            <GlobalAccount>
              <BrowserRouter>
                <CssBaseline />
                <GlobalStyle />
                <RootRouter />
              </BrowserRouter>
            </GlobalAccount>
          </AuthStateListener>
        </ApolloProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
