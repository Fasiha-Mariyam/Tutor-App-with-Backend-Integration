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

function AdminConnection({ user, heading }) {
  const loader = useSelector((state) => state.admin.isLoading);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(loader);
  console.log(user);

  // Render loader if data is still loading
  if (loader) {
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

  return (
    <>
      {user ? (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            m: 5,
            width: "90%",
            bgcolor: "LightBlue",
            maxHeight: "500px", // Set maximum height
            overflowY: "auto", // Allow vertical overflow
          }}
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
                  Student-Name
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bolder" }}>
                  Teacher-Name
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
              {user.map((user) => {
                if (user.status === "accepted" && user.tution !== null) {
                  return (
                    <TableRow
                      key={user._id}
                      sx={{ borderBottom: "2px solid white" }}
                    >
                      <TableCell align="center">
                        {user.tution.user.name}
                      </TableCell>
                      <TableCell align="center">{user.user.name}</TableCell>
                      <TableCell align="center">{user.amount}</TableCell>
                      <TableCell align="center">
                        {user.tution.title}
                      </TableCell>
                      <TableCell align="center">
                        {user.tution.description}
                      </TableCell>
                    </TableRow>
                  );
                } else {
                  return null;
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 5 }}>
          <strong>No connections have been made yet.</strong>
        </Typography>
      )}
    </>
  );
}

export default AdminConnection;
