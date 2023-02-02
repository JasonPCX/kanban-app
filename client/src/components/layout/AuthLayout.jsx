import { Box, Container } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { verifyAuth } from "../../utils/auth";
import Loading from "../common/Loading";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyAuth();
      if (isAuthenticated) {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <Loading fullHeight />;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src='#' style={{ width: "100px" }} alt='app logo' />
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthLayout;
