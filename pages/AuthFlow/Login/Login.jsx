import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Logo from "../../../assets/images/logo3.jpg";
import TUTOR from "../../../assets/images/tutor2.webp";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { dispatch, useSelector } from "../../../redux/store";
import {
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import {
  AccountCircle,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { signIn } from "../../../redux/slices/auth";
import { useNavigate , Link} from "react-router-dom";
import { setStorageItem, validateEmail } from "../../../utils";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const loader = useSelector((state) => state.auth.isLoader);
  console.log(loader);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emaiIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailOnchange = (e) => {
    setEmail(e.target.value);
    const res = validateEmail(e.target.value);
    if (res) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };
  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    if (!isEmailDirty || !isPasswordDirty) {
      enqueueSnackbar(`Please enter ${!isEmailDirty ? "Email" : "Password"} `, {
        autoHideDuration: 3000,
        variant: "warning",
      });
    }

    try {
      if (emaiIsValid && passwordIsValid) {
        const res = await dispatch(signIn({ email, password }));
        if (res?.data?._id) {
          enqueueSnackbar("Login successfully", {
            autoHideDuration: 3000,
            variant: "success",
          });

          await setStorageItem("user", res?.data);
          const userType = res.data.userType;
          switch (userType) {
            case 'student':
              navigate('/student/dashboard');
              break;
            case 'teacher':
              navigate('/teacher/dashboard');
              break;
            case 'admin':
              navigate('/admin/dashboard');
              break;
            default:
              navigate('/');
              break;
          }
        } else {
          enqueueSnackbar(`${res?.message}`, {
            autoHideDuration: 3000,
            variant: "error",
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
           item
           xs={false}
           sm={4}
           md={7}
           sx={{
             backgroundImage: `url(${TUTOR})`,
             backgroundRepeat: "no-repeat",
             backgroundSize: "cover",
             backgroundPosition: "center",
           }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              sx={{ width: "50%", height: "auto" }}
              src={Logo}
            />
            <Typography
              sx={{
                fontFamily: "Outfit",
                fontSize: 20,
              }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                mx: 4,
              }}
            >
              <InputLabel
                sx={{
                  color: "#312E49",
                  fontWeight: 500,
                  fontFamily: "Outfit",
                }}
              >
                Email
              </InputLabel>
              <TextField
                sx={{
                  mt: 1,
                  
                  backgroundColor: "#FFFFFF",
                  fontFamily: "Outfit",
                  "& label.Mui-focused": {
                    color: "#0055FF",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#0055FF",
                    },
                  },
                }}
                margin="normal"
                placeholder="Your email"
                required
                autoComplete="off"
                fullWidth
                error={!emaiIsValid && isEmailDirty ? true : false}
                value={email}
                onChange={(e) => handleEmailOnchange(e)}
                id="email"
                // label='Email'
                FormHelperTextProps={{
                  style: {
                    backgroundColor: "#fff",
                    marginLeft: "0rem",
                    marginRight: "0rem",
                    marginTop: "0rem",
                  },
                }}
                inputProps={{
                  onBlur: () => {
                    setIsEmailDirty(true);
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                size="large"
                helperText={
                  !emaiIsValid && isEmailDirty
                    ? email == ""
                      ? "Please enter email"
                      : "Please enter valid email"
                    : ""
                }
              />
              <InputLabel
                sx={{
                  color: "#312E49",
                  fontWeight: 500,
                  fontFamily: "Outfit",
                }}
              >
                Password
              </InputLabel>
              <TextField
                sx={{
                  backgroundColor: "#FFFFFF",
                  mt: 1,
                  fontFamily: "Outfit",
                  "& label.Mui-focused": {
                    color: "#0055FF",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#0055FF",
                    },
                  },
                }}
                id="password"
                error={!passwordIsValid && isPasswordDirty ? true : false}
                value={password}
                fullWidth
                placeholder="Your password"
                onInput={() => setIsPasswordDirty(true)}
                onChange={(e) => handlePasswordOnChange(e)}
                onBlur={() => setIsPasswordDirty(true)}
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="large"
                helperText={
                  !passwordIsValid && isPasswordDirty
                    ? email == ""
                      ?  "Password must be greater than 8 letters"
                      : "Password must be greater than 8 letters"
                    : ""
                }
                />
             

              <Button
                type="submit"
                fullWidth
                disabled={loader}
                variant="contained"
                sx={{
                  mt: 2,
                  height: "3rem",
                  background: "#0055FF",
                  color: "#FFF",
                  fontFamily: "Outfit",
                  textTransform: "capitalize",
                }}
              >
                {loader ? (
                  <CircularProgress
                    color="inherit"
                    size="1rem"
                    sx={{ mr: 2 }}
                  />
                ) : (
                  ""
                )}
                Sign In
              </Button>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "#6A717F",
                  fontFamily: "Outfit",
                }}
              >
                New to our platform?
                <Link
                  to="/signUp"
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    color: "#6A717F",
                    fontFamily: "Outfit",
                    textDecoration:"none"
                  }}
                >
                 <strong> SignUp</strong>
                </Link>
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
