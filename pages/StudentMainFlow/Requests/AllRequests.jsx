import React, { useState, useEffect } from "react";
import EnhancedTable from "../../../components/Table/Table";
import { Box } from "@mui/material";
import { getAllRequests } from "../../../redux/slices/requests";
import { dispatch } from "../../../redux/store";
import { useSelector } from "react-redux";

export default function AllRequests() {
  const allData = useSelector((state) => state.request.allRequests);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (!userData) {
          throw new Error("User data not found in local storage");
        }
        const id = JSON.parse(userData)._id;
        const requestsData = await dispatch(getAllRequests(id));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
      <EnhancedTable rows={allData} />
    </Box>
  );
}
