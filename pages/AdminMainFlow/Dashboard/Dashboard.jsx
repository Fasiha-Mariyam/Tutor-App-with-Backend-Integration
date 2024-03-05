import React, { useEffect, useState } from "react";
import { dispatch } from "../../../redux/store";
import { Box,Typography, Button } from "@mui/material";
import { getCommission, sumOfUsers } from "../../../redux/slices/admin";
import SumOfUser from "../../../components/Card/SumOfUser";
import { updateCommission } from "../../../redux/slices/admin";
import MySwal from "sweetalert2";
import Swal from "sweetalert2"; 
import BasicCard from "../../../components/Card/RecentConnections";
import { getAllConnections } from "../../../redux/slices/proposals";
import CircularProgress from "@mui/material/CircularProgress";


export default function AdminDashboard() {
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [data, setData] = useState([])
  const [commission, setCommission] = useState(0);
  const [loader, setLoader] = useState(true); 

  const handleCommissionChange = async () => {
    try {
      const { value } = await MySwal.fire({
        title: "Change Commission",
        input: "number",
        inputValue: commission,
        inputAttributes: {
          autocapitalize: "off",
          step: "0.01",
          min: "0",
        },
        showCancelButton: true,
        confirmButtonText: "Change",
        showLoaderOnConfirm: true,
        preConfirm: async (newValue) => {
          // Dispatch action to update commission
          const response = await dispatch(
            updateCommission({
              percentage: parseFloat(newValue),
              email: "admin@gmail.com",
            })
          );
          if (response.message) {
            Swal.fire("Success!", `${response.message}`, "success");
            setCommission(parseFloat(newValue));
          }
          console.log(response.message);
          return response?.data;
        },
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error!",
        "An error occurred while updating commission.",
        "error"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (!userData) {
          throw new Error("User data not found in local storage");
        }
        const id = JSON.parse(userData)._id;
        const teacherResponse = await dispatch(sumOfUsers("teacher", id));
        const studentResponse = await dispatch(sumOfUsers("student", id));
        const requestsData = await dispatch(getAllConnections("accepted",id));
        setData(requestsData)
        const commission = await dispatch(getCommission());
        setCommission(  commission.data[0].percentage)
        setTeacherCount(teacherResponse.data);
        setStudentCount(studentResponse.data);
        setLoader(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loader ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* commission part */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              mt: 1,
              mb: 5,
              bgcolor: "rgb(162 212 228)", // Background color for commission section
              p: 2, // Padding for commission section
              borderRadius: 1, // Border radius for commission section
            }}
          >
            <Typography variant="h6" component="div">
              <strong> Current Commission: {commission}%</strong>
            </Typography>
            <Button
              variant="contained"
              onClick={handleCommissionChange}
              sx={{ bgcolor: "#f0f0f0", color: "black" }}
            >
              Update Commission
            </Button>
          </Box>
          {/* no of users */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              m: 2,
              gap: 5,
              mb: 3,
            }}
          >
            <SumOfUser user={teacherCount} title="Number of Teachers" />
            <SumOfUser user={studentCount} title="Number of Students" />
          </Box>
          {/* new connections  */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              mt: 1,
              mb: 5,
              bgcolor: "rgb(162 212 228)", // Background color for commission section
              p: 2, // Padding for commission section
              borderRadius: 1, // Border radius for commission section
            }}
          >
            <strong>Recent Connections</strong>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              m: 2,
              gap: 5,
            }}
          >
            {data
            .slice(0, 3)
            .map((item, index) => (
              <BasicCard
                key={index}
                stuEmail={item.tution.user.email}
                teachEmail={item.user.email}
                stuName={item.tution.user.name}
                teachName={item.user.name}
                amount={item.amount}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
  
}
