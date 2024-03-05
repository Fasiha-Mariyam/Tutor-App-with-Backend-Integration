import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function TeacherStudentConnections({ Email, title, Name, description, amount ,role}) {
    return (
        <Card sx={{ minWidth: 275 , mb: 3 ,  bgcolor:"rgb(201 203 204)"}}>
          <CardContent>
            <Typography variant="body2" component="div">
            {role === "teacher" ? "Student Name:" : "Teacher Name:"}<strong>{Name}</strong>
            </Typography>
            <Typography variant="body2" component="div">
            {role === "teacher" ? "Student Email:" : "Teacher Email:"} <strong>{Email}</strong>
            </Typography>
            <Typography variant="body2" component="div">
              Title: <strong>{title}</strong>
            </Typography>
            <Typography variant="body2" component="div">
             Description : <strong>{description}</strong>
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
