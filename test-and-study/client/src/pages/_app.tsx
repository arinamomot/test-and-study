import { AppProps } from "next/app";
import Head from "next/head";
import { Component, createContext } from "react";
import TestStore from "../store/TestStore";
import UserStore from "../store/UserStore";
import "../styles/globals.scss";

interface State {
  userStore: UserStore;
  testStore: TestStore;
}

export const userStore = new UserStore();

export const testStore = new TestStore();

export const Context = createContext<State>({
  userStore,
  testStore,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/*<ThemeProvider theme={theme}>*/}
      <Head>
        <title>Test&Study</title>
        <link rel="icon" href={"../favicon.ico"} />
        <link
          rel="manifest"
          href={"../manifest.json"}
          crossOrigin="use-credentials"
        />

        <meta name="keywords" content="test, tests" />
        <meta charSet="utf-8" />
      </Head>
      <Context.Provider
        value={{
          userStore,
          testStore,
        }}
      >
        <Component {...pageProps} />
      </Context.Provider>
      {/*</ThemeProvider>*/}
    </>
  );
}

export default App;
