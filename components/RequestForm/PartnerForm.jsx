import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { dispatch } from "../../redux/store";
import { createRequest} from "../../redux/slices/requests";
import { useNavigate } from "react-router-dom";

const PartnerForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = await localStorage.getItem("user");
      if (!userData) {
        throw new Error("User data not found in local storage");
      }
      const user = JSON.parse(userData)._id;
      console.log(user);
      // Validation checks

      if (title === "" || description === "" || location === "" || fee === "") {
        enqueueSnackbar(`Please fill all the required fields`, {
          autoHideDuration: 3000,
          variant: "warning",
        });
      } 
      else if (/^\d/.test(title)) {
        enqueueSnackbar(
          `Title should not start with a number`,
          {
            autoHideDuration: 3000,
            variant: "warning",
          }
        );
        return; // Stop execution if validation fails
      }
      else if (/^\d/.test(description)) {
        enqueueSnackbar(
          `Description should not start with a number`,
          {
            autoHideDuration: 3000,
            variant: "warning",
          }
        );
        return; // Stop execution if validation fails
      }      
      else if (!/^[A-Za-z,\s]+$/.test(location)) {
        enqueueSnackbar(
          `Location should contain only alphabets, commas, and spaces`,
          {
            autoHideDuration: 3000,
            variant: "warning",
          }
        );
        return; // Stop execution if validation fails
      }
      else if (fee < 0) {
        enqueueSnackbar(`Fee should be greater than 0`, {
          autoHideDuration: 3000,
          variant: "warning",
        });
        return; // Stop execution if validation fails
      }
      else {
        setLoading(true);

        const objToSend = {
          user,
          title,
          description,
          location,
          fee,
        };
        const res = await dispatch(createRequest(objToSend));
        if (res === 200 || res === 201) {
          setLoading(false);
          enqueueSnackbar(`Request submitted successfully`, {
            autoHideDuration: 3000,
            variant: "success",
          });
          navigate("/student/allRequests")
          setTitle("");
          setDescription("");
          setLocation("");
          setFee("");
          setLoading(false);
        } else {
          setLoading(false);
          enqueueSnackbar(`Request not submitted successfully`, {
            autoHideDuration: 3000,
            variant: "error",
          });
        }
      }
    } catch (error) {
      setLoading(false);
      enqueueSnackbar(`Request not submitted successfully`, {
        autoHideDuration: 3000,
        variant: "error",
      });
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: 450,
              fontSize: "24px",
              color: "#111111",
              fontFamily: "Outfit",
            }}
          >
            Create Request
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "5px",
            backgroundColor: "#6377E81A",
            my: 2,
            boxShadow:
              " 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              padding: "30px",
              display: "flex",
              flexDirection: { sm: "column", xs: "column" },
            }}
          >
            {/* Title and Description */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", sm: "column", xs: "column" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: { md: "48%", sm: "100%", xs: "100%" },
                }}
              >
                <InputLabel
                  sx={{
                    color: "#6B7280",
                    fontWeight: "bold",
                    fontFamily: "Outfit",
                  }}
                >
                  Title
                </InputLabel>

                <TextField
                  sx={{
                    mt: 1,
                    mb: 2,
                    fontFamily: "Outfit",
                    width: { md: "100%", sm: "100%", xs: "100%" },
                    backgroundColor: "#F9FAFB",
                    "& label.Mui-focused": {
                      color: "#0055FF",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#0055FF",
                      },
                    },
                  }}
                  placeholder="Title of Request"
                  margin="normal"
                  autoComplete="off"
                  value={title}
                  onChange={(e) => setTitle(e?.target.value)}
                  id="title"
                  size="large"
                />
              </Box>
              <Box
                sx={{
                  width: { md: "48%", sm: "100%", xs: "100%" },
                }}
              >
                <InputLabel
                  sx={{
                    color: "#6B7280",
                    fontWeight: "bold",
                    fontFamily: "Outfit",
                  }}
                >
                  Description
                </InputLabel>

                <TextField
                  sx={{
                    mt: 1,
                    mb: 2,
                    fontFamily: "Outfit",
                    width: { md: "100%", sm: "100%", xs: "100%" },
                    backgroundColor: "#F9FAFB",
                    "& label.Mui-focused": {
                      color: "#0055FF",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#0055FF",
                      },
                    },
                  }}
                  placeholder="Description"
                  margin="normal"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e?.target.value)}
                  id="description"
                  size="large"
                />
              </Box>
            </Box>
            {/* Location and Fee */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", sm: "column", xs: "column" },
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: { md: "48%", sm: "100%", xs: "100%" },
                }}
              >
                <InputLabel
                  sx={{
                    color: "#6B7280",
                    fontWeight: "bold",
                    fontFamily: "Outfit",
                  }}
                >
                  Location
                </InputLabel>

                <TextField
                  sx={{
                    mt: 1,
                    mb: 2,
                    fontFamily: "Outfit",
                    width: { md: "100%", sm: "100%", xs: "100%" },
                    backgroundColor: "#F9FAFB",
                    "& label.Mui-focused": {
                      color: "#0055FF",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#0055FF",
                      },
                    },
                  }}
                  placeholder="Location"
                  margin="normal"
                  autoComplete="off"
                  value={location}
                  onChange={(e) => setLocation(e?.target.value)}
                  id="location"
                  size="large"
                />
              </Box>
              <Box
                sx={{
                  width: { md: "48%", sm: "100%", xs: "100%" },
                }}
              >
                <InputLabel
                  sx={{
                    color: "#6B7280",
                    fontWeight: "bold",
                    fontFamily: "Outfit",
                  }}
                >
                  Fee
                </InputLabel>

                <TextField
                  sx={{
                    mt: 1,
                    mb: 2,
                    fontFamily: "Outfit",
                    width: { md: "100%", sm: "100%", xs: "100%" },
                    backgroundColor: "#F9FAFB",
                    "& label.Mui-focused": {
                      color: "#0055FF",
                    },
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#0055FF",
                      },
                    },
                  }}
                  type="number"
                  placeholder="Amount Of Fee"
                  margin="normal"
                  autoComplete="off"
                  inputProps={{ min: 0 }}
                  value={fee}
                  onChange={(e) => setFee(e?.target.value)}
                  id="fee"
                  size="large"
                />
              </Box>
            </Box>
            {/* Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "#0055FF",
                  color: "#FFF",
                  fontFamily: "Outfit",
                }}
              >
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size="1rem"
                    sx={{ mr: 2 }}
                  />
                ) : (
                  ""
                )}
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PartnerForm;