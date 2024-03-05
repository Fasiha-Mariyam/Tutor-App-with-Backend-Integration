import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function BasicCard({ stuEmail, teachEmail, stuName, teachName, amount }) {

  return (
    <Card sx={{ minWidth: 275 , mb: 3 ,bgcolor:"rgb(201 203 204)"}}>
      <CardContent>
        <Typography variant="body2" component="div">
          Student Name: <strong>{stuName}</strong>
        </Typography>
        <Typography variant="body2" component="div">
          Student Email: <strong>{stuEmail}</strong>
        </Typography>
        <Typography variant="body2" component="div">
          Teacher Name: <strong>{teachName}</strong>
        </Typography>
        <Typography variant="body2" component="div">
          Teacher Email: <strong>{teachEmail}</strong>
        </Typography>
        <Typography variant="body2">
          Decided Amount 
          <br />
          <strong>{amount}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
}

