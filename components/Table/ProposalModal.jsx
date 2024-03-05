import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { enqueueSnackbar } from "notistack";
import { InputLabel, TextField, Button } from "@mui/material";
import { dispatch } from "../../redux/store";
import { createProposals } from "../../redux/slices/proposals";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProposalModal({ name, reqId, amount }) {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fee, setFee] = React.useState(0);
  const loader = useSelector((state)=>state.proposal.isLoading)
console.log(loader);
  const sendProposal = async () => {
    const userData = await localStorage.getItem("user");
    if (!userData) {
      throw new Error("User data not found in local storage");
    }
    const teachID = JSON.parse(userData)._id;
    const proposalData = {
      user: teachID,
      tution: reqId,
      amount: fee,
    };
    console.log(proposalData);
    let response = await dispatch(createProposals(proposalData));
    console.log(response);

    handleClose();
    if (response.statusCode === 400) {
      enqueueSnackbar(`${response.message}`, {
        autoHideDuration: 3000,
        variant: "error",
      });
    } else {
      enqueueSnackbar(`${response.message}`, {
        autoHideDuration: 3000,
        variant: "success",
      });
      navigate("/teacher/allProposals")
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: "white" }}>
        Proposal
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <strong>Proposal Details</strong>
            <br />
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
              value={name}
              disabled
            />
            <InputLabel
              sx={{
                color: "#312E49",
                fontWeight: 500,
                fontFamily: "Outfit",
              }}
            >
              Student Fees
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
              required
              autoComplete="off"
              value={amount}
              disabled
            />
            <InputLabel
              sx={{
                color: "#312E49",
                fontWeight: 500,
                fontFamily: "Outfit",
              }}
            >
              Your Requested Fees
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
            />
            <Button variant="contained" onClick={sendProposal}  disabled={loader || fee <= 0 }>
            {loader ? "Loading..." : "Send Proposal"}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
