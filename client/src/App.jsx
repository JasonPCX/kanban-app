import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import AuthLayout from "./components/layout/AuthLayout";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Board from "./pages/Board";

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<LogIn />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='boards' element={<Home />} />
            <Route path='boards/:boardId' element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
