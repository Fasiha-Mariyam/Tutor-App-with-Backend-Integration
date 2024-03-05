import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@mui/material";
import {
  AccountCircle,
  LockOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "../../../redux/store";
import { signIn, signUp } from "../../../redux/slices/auth";
import { useNavigate, Link } from "react-router-dom";
import { dispatch } from "../../../redux/store";
import { setStorageItem, validateEmail, validateName } from "../../../utils";
import Logo from "../../../assets/images/logo3.jpg";
import TUTOR from "../../../assets/images/tutor2.webp";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Registration() {
  const navigate = useNavigate();

  const loader = useSelector((state) => state.auth.isLoader);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [emaiIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isEmailDirty, setIsEmailDirty] = useState(false);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNameOnChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setNameIsValid(validateName(newName));
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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
    console.log(role);
    e.preventDefault();
    if (!role || !nameIsValid || !emaiIsValid || !passwordIsValid) {
      enqueueSnackbar(
        `Please enter ${
          !isNameDirty
            ? "Name"
            : !isEmailDirty
            ? "Email"
            : !isPasswordDirty
            ? "Password"
            : "Role"
        } `,
        {
          autoHideDuration: 3000,
          variant: "warning",
        }
      );
    }

    try {
      if (role && nameIsValid && emaiIsValid && passwordIsValid) {
        const res = await dispatch(signUp({
          name,
          email,
          password,
          userType: role.toString() // Convert role to string and send as userType
        }));
        console.log(email, password, name, role);
        if (res?.data?._id) {
          enqueueSnackbar("SignUp successfully", {
            autoHideDuration: 3000,
            variant: "success",
          });

          await setStorageItem("user", res?.data);
          navigate("/");
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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate // disable browser validation
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                mx: 4,
              }}
            >
              {/* name Input field */}
              <InputLabel
                sx={{
                  color: "#312E49",
                  fontWeight: 500,
                  fontFamily: "Outfit",
                }}
              >
                Name
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
                placeholder="Your name"
                required
                autoComplete="off"
                fullWidth
                error={!nameIsValid && isNameDirty}
                value={name}
                onChange={(e) => handleNameOnChange(e)}
                id="name"
                FormHelperTextProps={{
                  style: {
                    marginLeft: "0rem",
                    marginRight: "0rem",
                    marginTop: "0rem",
                  },
                }}
                inputProps={{
                  onBlur: () => {
                    setIsNameDirty(true);
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
                  !nameIsValid && isNameDirty ? "Please enter a valid name" : ""
                }
              />
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
                FormHelperTextProps={{
                  style: {
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
              />
              {!passwordIsValid && isPasswordDirty ? (
                <FormHelperText sx={{ color: "red" }}>
                  Password must be greater than 7 characters
                </FormHelperText>
              ) : (
                ""
              )}
              <InputLabel
                sx={{
                  color: "#312E49",
                  fontWeight: 500,
                  fontFamily: "Outfit",
                }}
              >
                <br />
                Select Your Role
              </InputLabel>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="role"
                  name="role"
                  value={role}
                  onChange={handleRoleChange}
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="teacher"
                    control={<Radio />}
                    label="Teacher"
                  />
                </RadioGroup>
              </FormControl>
              <p
                style={{
                  fontSize: "16px",
                  marginTop: "10px",
                  fontWeight: 300,
                  color: "#6A717F",
                  fontFamily: "Outfit",
                }}
              >
                If you're already registered,
                <Link
                  to="/"
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    color: "#6A717F",
                    fontFamily: "Outfit",
                    textDecoration: "none",
                  }}
                >
                  <strong>Login Here</strong>
                </Link>
              </p>
              <Button
                type="submit"
                fullWidth
                disabled={loader}
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
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
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
