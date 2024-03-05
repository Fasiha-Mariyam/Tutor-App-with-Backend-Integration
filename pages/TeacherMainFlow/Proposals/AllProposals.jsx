import React, { useEffect, useState } from 'react'
import { getAllProposals } from '../../../redux/slices/proposals';
import { dispatch } from '../../../redux/store';
import { Box } from '@mui/material';
import TeacherProposalTable from '../../../components/Table/TeacherProposalTable';

export default function AllProposals() {
  const [data,setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (!userData) {
          throw new Error("User data not found in local storage");
        }
        const id = JSON.parse(userData)._id;
        const requestsData = await dispatch(getAllProposals(id));
        setData(requestsData)
        console.log(requestsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 
  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
     <TeacherProposalTable rows={data}/>
     </Box>
    </>
  )
}
