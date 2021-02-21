import React, { Suspense, useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Header, LoadingSpinner } from "./components";
import { Authentication, Home, Todos } from "./pages/";
import lightTheme from "./themes/light";
import darkTheme from "./themes/dark";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { StyledApp, StyledAppSpacer, GlobalStyle } from "./StyledApp";
import { AuthContext } from "./context/auth-context";
import { isEventValid } from "./utils/utils";

const App = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const login = useCallback((userId, authToken, username) => {
    setAuthToken(authToken);
    setUserId(userId);
    setUsername(username);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId,
        authToken,
        username,
      })
    );
  }, []);

  const logout = useCallback((event) => {
    if (isEventValid(event)) {
      setIsLoggingOut(true);
      setAuthToken(null);
      setUserId(null);
      localStorage.clear();
    }
  }, []);

  useEffect(() => {
    const darkTheme = localStorage.getItem("darkTheme");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    darkTheme && setDarkTheme(JSON.parse(darkTheme));
    storedUserData &&
      storedUserData.authToken &&
      login(
        storedUserData.userId,
        storedUserData.authToken,
        storedUserData.username
      );
  }, [login]);

  useEffect(() => {
    localStorage.setItem("darkTheme", isDarkTheme);
  }, [isDarkTheme]);

  const routes = authToken ? (
    <Switch>
      <Route path="/todos" exact>
        <Todos />
      </Route>
      <Redirect to="/todos" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/authentication" exact>
        <Authentication />
      </Route>
      <Redirect to="/authentication" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!authToken,
        authToken,
        userId,
        username,
        isLoggingOut,
        setIsLoggingOut,
        login,
        logout,
      }}
    >
      <Router>
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <GlobalStyle />
          <StyledApp>
            <StyledAppSpacer />
            <Header
              title={"ToDOrganizer"}
              isDarkTheme={isDarkTheme}
              toggleThemeMode={(event) => setDarkTheme(event.target.checked)}
            />
            <main className="app__page-content">
              <Suspense fallback={<LoadingSpinner />}>{routes}</Suspense>
            </main>
          </StyledApp>
        </ThemeProvider>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
