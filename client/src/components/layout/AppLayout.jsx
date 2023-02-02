import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";

import { verifyAuth } from "../../utils/auth";
import Loading from "../common/Loading";
import Sidebar from '../common/Sidebar'

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const authInfo = await verifyAuth();

      if (!authInfo) {
        navigate("/login");
      } else {
        dispatch(setUser(authInfo));
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <Loading fullHeight />;
  }

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          p: 1,
          width: "max-content",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
