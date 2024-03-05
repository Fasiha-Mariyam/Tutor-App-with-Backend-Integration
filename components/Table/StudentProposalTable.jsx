import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { dispatch } from "../../redux/store";
import { statusAccept, statusReject } from "../../redux/slices/requests";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CircularProgress } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Teacher Name" },
  { id: "email", numeric: false, disablePadding: true, label: "Email" },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  { id: "fee", numeric: true, disablePadding: false, label: "Fee" },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  { id: "proposal", numeric: false, disablePadding: false, label: "Status" },
];

function StudentProposalTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Typography variant="body1" noWrap>
              <strong>{headCell.label}</strong>
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

StudentProposalTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function StudentProposalTableToolbar(props) {
  const { numSelected, onFilterChange } = props;

  const [filter, setFilter] = React.useState("");
  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
    setFilter(event.target.value);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h6" id="tableTitle" component="div">
          <strong>Received Proposals</strong>
        </Typography>
        <Select
          value={filter}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ "aria-label": "Filter by status" }}
        >
          <MenuItem value="">
            <em>All Statuses</em>
          </MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="accepted">Accepted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </Select>
      </Box>
    </Toolbar>
  );
}
StudentProposalTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default function StudentProposalTable({ rows }) {
  if (!rows) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography color="inherit" variant="h6" component="div" my={3}>
          <strong>No Proposal has been recieved </strong>
        </Typography>
      </Box>
    );
  }
  const [row, setRows] = React.useState(rows);
  const loader = useSelector((state) => state.request.isLoading);
  console.log(loader);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleAccept = async (tutionid, userId, teacherId) => {
    const acceptData = {
      teacherId,
      tution: tutionid,
      studentId: userId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Once Accepted, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(statusAccept(acceptData));
        // console.log(response.message);
        Swal.fire({
          title: "Accepted!",
          text: "This Proposal has been Accepted.",
          icon: "success",
        });
      }
    });
  };

  const handleReject = (tutionId, userId, teacherId) => {
    const rejectData = {
      teacherId,
      tution: tutionId,
      studentId: userId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Once  Rejected, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "green",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(statusReject(rejectData));
        Swal.fire({
          title: "Rejected!",
          text: "This Proposal has been Rejected.",
          icon: "success",
        });
      }
    });
  };

  const filteredRows = React.useMemo(() => {
    if (!filter) {
      return rows; // Return all rows if no filter is selected
    } else {
      return rows.filter((row) => row.status === filter); // Filter rows based on the status
    }
  }, [filter, rows]);

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [filteredRows, order, orderBy, page, rowsPerPage]
  );

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // if (loader) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "300px",
  //       }}
  //     >
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <Box sx={{ width: "90%", display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "90%", mb: 2 }}>
        <StudentProposalTableToolbar
          numSelected={selected.length}
          onFilterChange={handleFilterChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 70 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <StudentProposalTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.length > 0 ? (
                visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox"></TableCell>

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.user.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.user.email}
                      </TableCell>
                      <TableCell align="left">{row.tution.title}</TableCell>
                      <TableCell align="left">
                        {row.tution.description}
                      </TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="left">{row.tution.location}</TableCell>
                      <TableCell
                        align="left"
                        style={{
                          color:
                            row.status === "pending"
                              ? "grey"
                              : row.status === "accepted"
                              ? "green"
                              : row.status === "rejected"
                              ? "red"
                              : "inherit",
                        }}
                      >
                        {row.status === "pending" ? (
                          <>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                              }}
                              onClick={() =>
                                handleAccept(
                                  row.tution._id,
                                  row.tution.user._id,
                                  row.user._id
                                )
                              }
                            >
                              Accept
                            </Button>{" "}
                            <Button
                              variant="contained"
                              style={{ backgroundColor: "red", color: "white" }}
                              onClick={() =>
                                handleReject(
                                  row.tution._id,
                                  row.tution.user._id,
                                  row.user._id
                                )
                              }
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          row.status
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: "center" }}>
                    No proposals to show
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

StudentProposalTable.propTypes = {
  rows: PropTypes.array.isRequired,
};
