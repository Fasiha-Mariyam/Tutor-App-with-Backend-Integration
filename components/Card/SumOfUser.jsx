import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function SumOfUser({ user, title }) {
  const loader = useSelector((state) => state.admin.isLoading);

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor:"#f0f0f0"
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
      <strong>    {title}</strong>
        </Typography>
        {loader ? (
          <CircularProgress />
        ) : (
          <Typography variant="h5" component="div">
            {user}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
