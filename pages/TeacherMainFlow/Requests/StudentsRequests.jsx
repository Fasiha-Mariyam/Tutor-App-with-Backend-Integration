import React, { useEffect , useState } from 'react'
import { getAllReqData } from '../../../redux/slices/requests';
import { dispatch } from '../../../redux/store';
import AllRequestTable from '../../../components/Table/AllRequestsTable';
import { Box } from '@mui/material';

export default function StudentsRequests() {
  const [requestData, setRequestData] = useState([]);
  let teachID ;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await dispatch(getAllReqData());
        console.log(requestsData);
        setRequestData(requestsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 
  return (
    <>
    <Box display="flex" justifyContent="center" alignItems="center" m={2}>
    <AllRequestTable rows={requestData} />
    </Box>
    </>
  )
}
