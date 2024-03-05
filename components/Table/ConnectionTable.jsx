import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

function ConnectionTable({ user, heading, role }) {
  const loader1 = useSelector((state) => state.proposal.isLoading);
  const loader = useSelector((state) => state.admin.isLoading);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(loader, loader1);

  // Render loader if data is still loading
  if (loader || loader1) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  // Render table if data is loaded
  return (
    <>
    {user ? (
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ m: 5, width: "90%", bgcolor: "LightBlue" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ borderBottom: "2px solid white" }}>
                <TableCell colSpan={5} align="center">
                  <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                    {heading}
                  </Typography>
                </TableCell>
              </TableRow>

              <TableRow sx={{ borderBottom: "2px solid white" }}>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Email
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Amount
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Title
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Description
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {user.some((user) => user.status === "accepted") ? (
                user.map((user) => {
                  if (user.status === "accepted") {
                    return (
                      <TableRow
                        key={user._id}
                        sx={{ borderBottom: "2px solid white" }}
                      >
                        <TableCell align="center">
                          {role === "student"
                            ? user.user.name
                            : user.tution.user.name}
                        </TableCell>
                        <TableCell align="center">
                          {role === "student"
                            ? user.user.email
                            : user.tution.user.email}
                        </TableCell>
                        <TableCell align="center">{user.amount}</TableCell>
                        <TableCell align="center">{user.tution.title}</TableCell>
                        <TableCell align="center">
                          {user.tution.description}
                        </TableCell>
                      </TableRow>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <strong> No connections have been made yet.</strong>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      ) : (
        <Typography variant="h6" align="center" sx={{mt:5}}>
          <strong>No connections have been made yet.</strong>
        </Typography>
      )}
    </>
  );
}

export default ConnectionTable;
