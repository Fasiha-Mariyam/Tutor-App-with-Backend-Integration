import React, { useEffect, useState } from "react";
import { dispatch } from "../../../redux/store";
import { Box, Typography, Button } from "@mui/material";
import {
  getAllConnections,
  getAllProposals,
} from "../../../redux/slices/proposals";
import CircularProgress from "@mui/material/CircularProgress";
import TeacherStudentConnections from "../../../components/Card/TeacherStudentConnections";
import { useNavigate } from "react-router-dom";
import { getAllReqData } from "../../../redux/slices/requests";
import TeacherProposalCard from "../../../components/Card/TeacherProposalCard";
import RequestCard from "../../../components/Card/RequestCard";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [req, setReq] = useState([]);
  const [pro, setPro] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleRedirection = () => {
    navigate("/teacher/StudentRequests");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (!userData) {
          throw new Error("User data not found in local storage");
        }
        const id = JSON.parse(userData)._id;
        const connectionData = await dispatch(
          getAllConnections("accepted", id)
        );
        const reqData = await dispatch(getAllReqData(id));
        const proData = await dispatch(getAllProposals(id));
        setReq(reqData);
        setData(connectionData);  
        setPro(proData);
        console.log("req", reqData);
        console.log("pro", proData);
        console.log("con", connectionData);
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
          {/* recent proposals */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              mt: 1,
              mb: 5,
              bgcolor: "rgb(162 212 228)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <strong>Recent Proposals</strong>
            {req && req.length > 0 && (
              <Button
                variant="contained"
                onClick={handleRedirection}
                sx={{ bgcolor: "#f0f0f0", color: "black" }}
              >
                Add Proposal
              </Button>
              )}
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
            {pro && pro.length > 0 ? (
              pro
                .slice(0, 3)
                .map((item, index) => (
                  <TeacherProposalCard
                    key={index}
                    title={item.tution.title}
                    Name={item.tution.user.name}
                    description={item.tution.description}
                    fee={item.amount}
                    amount={item.tution.fee}
                    status={item.status}
                  />
                ))
            ) : (
              <Typography variant="body1">
                No Proposals Available
              </Typography>
            )}
          </Box>
          {/* recent Requests */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              mt: 1,
              mb: 5,
              bgcolor: "rgb(162 212 228)",
              p: 2,
              borderRadius: 1,
            }}
          >
            <strong>Recent Requests</strong>
            {req && req.length > 0 && (
              <Button
                variant="contained"
                onClick={handleRedirection}
                sx={{ bgcolor: "#f0f0f0", color: "black" }}
              >
                More Details
              </Button>
            )}
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
            {req && req.length > 0 ? (
              req
                .filter((item) => item.status === "pending")
                .slice(0, 3)
                .map((item, index) => (
                  <RequestCard
                    key={index}
                    title={item.title}
                    description={item.description}
                    amount={item.fee}
                  />
                ))
            ) : (
              <Typography variant="body1">
                No Request Has Been Added
              </Typography>
            )}
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
            {data != null && data.length > 0 ? (
              data
                .filter((item) => item.status === "accepted")
                .slice(0, 3)
                .map((item, index) => (
                  <TeacherStudentConnections
                    key={index}
                    role={"teacher"}
                    Email={item.tution.user.email}
                    title={item.tution.title}
                    Name={item.tution.user.name}
                    description={item.tution.description}
                    amount={item.amount}
                  />
                ))
            ) : (
              <Typography variant="body1">No connection available</Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
}
