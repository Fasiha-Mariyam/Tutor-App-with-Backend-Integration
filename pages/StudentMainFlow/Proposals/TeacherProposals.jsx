import React, { useEffect, useState } from "react";
import { getAllProposals } from "../../../redux/slices/requests";
import { dispatch } from "../../../redux/store";
import StudentProposalTable from "../../../components/Table/StudentProposalTable";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
export default function TeacherProposals() {
  const proposals = useSelector((state) => state.request.proposal);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (!userData) {
          throw new Error("User data not found in local storage");
        }
        const id = JSON.parse(userData)._id;
        const requestsData = await dispatch(getAllProposals(id));
        console.log(requestsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" m={2}>
        <StudentProposalTable rows={proposals} />
      </Box>
    </>
  );
}
