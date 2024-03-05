import React, { useEffect, useState } from "react";
import { dispatch } from "../../../redux/store";
import { Box, Typography, Button } from "@mui/material";
import { getAllConnections } from "../../../redux/slices/proposals";
import CircularProgress from "@mui/material/CircularProgress";
import TeacherStudentConnections from "../../../components/Card/TeacherStudentConnections";
import {
  getAllProposals,
  getAllRequests,
} from "../../../redux/slices/requests";
import RequestCard from "../../../components/Card/RequestCard";
import { useNavigate } from "react-router-dom";
import ProposalCard from "../../../components/Card/ProposalCard";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [req, setReq] = useState([]);
  const [pro, setPro] = useState([]);
  const [loader, setLoader] = useState(true);

  const handleRedirection = () => {
    navigate("/student/createRequest");
  };

  const handleProposal = () => {
    navigate("/student/teacherProposals");
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
        const reqData = await dispatch(getAllRequests(id));
        const proData = await dispatch(getAllProposals(id));
        setReq(reqData);
        setData(connectionData);
        setPro(proData);
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
          {/* new proposals */}
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
            {pro &&
              pro.length > 0 &&
              pro.some((proposal) => proposal.status === "pending") && (
                <Button
                  variant="contained"
                  onClick={handleProposal}
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
            {pro &&
            pro.length > 0 &&
            pro.some((proposal) => proposal.status === "pending") ? (
              pro
                .filter((item) => item.status === "pending")
                .slice(0, 3)
                .map((item, index) => (
                  <ProposalCard
                    key={index}
                    role={"student"}
                    title={item.tution.title}
                    Name={item.user.name}
                    description={item.tution.description}
                    fee={item.tution.fee}
                    amount={item.amount}
                  />
                ))
            ) : (
              <Typography variant="body1" sx={{mb:2}}>
                No Pending Proposals Available
              </Typography>
            )}
          </Box>
          {/* new Requests */}
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
            <Button
              variant="contained"
              onClick={handleRedirection}
              sx={{ bgcolor: "#f0f0f0", color: "black" }}
            >
              Add Requests
            </Button>
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
                    role={"student"}
                    title={item.title}
                    Name={item.user.name}
                    description={item.description}
                    amount={item.fee}
                  />
                ))
            ) : (
              <Typography variant="body1" sx={{mb:2}}>
                No Request Has Been Added{" "}
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
            {data && data.filter(item => item.status === "accepted").length > 0 ? (
              data
                .slice(0, 3)
                .map((item, index) => (
                  <TeacherStudentConnections
                    key={index}
                    role={"student"}
                    Email={item.user.email}
                    title={item.tution.title}
                    Name={item.user.name}
                    description={item.tution.description}
                    amount={item.amount}
                  />
                ))
            ) : (
              <Typography variant="body1">No Connection Available</Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
}
