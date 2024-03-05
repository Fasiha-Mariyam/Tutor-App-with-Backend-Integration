import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApprovalIcon from '@mui/icons-material/Approval';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddCardIcon from '@mui/icons-material/AddCard';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideBar({logout , data , role}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handlePageNavigation = (path) => {
    navigate(path);
  };
  const roleBasedPages = {
    student: [
      { name: "Dashboard", path: "/student/dashboard", icon: <DashboardIcon /> },
      { name: "Add-Request", path: "/student/createRequest", icon: <AddCardIcon /> },
      { name: "All-Request", path: "/student/allRequests", icon: <ReceiptIcon /> },
      { name: "Teacher-Proposals", path: "/student/teacherProposals", icon: <ApprovalIcon/> },
      { name: "Connections", path: "/student/allConnections", icon: <ConnectWithoutContactIcon/> },
    ],
    teacher: [
      { name: "Dashboard", path: "/teacher/dashboard", icon: <DashboardIcon /> },
      { name: "All-Requests", path: "/teacher/StudentRequests", icon: <ApprovalIcon /> },
      { name: "All-Proposals", path: "/teacher/allProposals", icon: <ReceiptIcon /> },
      { name: "Connections", path: "/teacher/Connections", icon: <ConnectWithoutContactIcon/> },
    ],
    admin: [
      { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
      { name: "Student Details", path: "/admin/allStudents", icon: <PeopleAltIcon /> },
      { name: "Teacher Details", path: "/admin/allTeachers", icon: <GroupIcon /> },
      { name: "All-Connections", path: "/admin/allConnections", icon: <ConnectWithoutContactIcon /> },
    ],
  };

  const setting = ["logout"]

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{bgcolor:"LightBlue" , color:"black"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" >
           TUTOR APP
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {roleBasedPages[role].map((page) => (
            <ListItem
              key={page.name}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handlePageNavigation(page.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            {setting.map((btn) => (
              <ListItem key={btn} disablePadding sx={{ display: "block" }} onClick={logout}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={btn} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 , m:0}}>
        <DrawerHeader />
        {data}
      </Box>
    </Box>
  );
}
