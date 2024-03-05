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
import CircularProgress from '@mui/material/CircularProgress';

function UserDetailsTable({ user, heading }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const loader = useSelector((state) => state.admin.isLoading);
  console.log(loader);

  // Render loader if data is still loading
  if (loader) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
        <CircularProgress />
      </div>
    );
  }

  // Render table if data is loaded
  return (
    <>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ m: 5, width: "90%", bgcolor: "LightBlue" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "2px solid white" }}>
              <TableCell colSpan={3}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ fontWeight: "bolder" }}
                >
                  {heading}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ borderBottom: "2px solid white" }}
            >
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>Email</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bolder" }}>Type</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {user.map((user) => (
              <TableRow key={user.id} sx={{ borderBottom: "2px solid white" }}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.userType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserDetailsTable;
