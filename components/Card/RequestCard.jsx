import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function RequestCard({ title, description, amount }) {

    return (
        <Card sx={{ minWidth: 275 , mb: 3 ,  bgcolor:"rgb(201 203 204)"}}>
          <CardContent>
            <Typography variant="body2" component="div">
              Title: <strong>{title}</strong>
            </Typography>
            <Typography variant="body2" component="div">
             Description : <strong>{description}</strong>
            </Typography>
            <Typography variant="body2">
            Fee : <strong> {amount}</strong>
            </Typography>
          </CardContent>
        </Card>
      );
}
