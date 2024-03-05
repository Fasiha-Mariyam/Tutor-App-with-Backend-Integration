import React, { useEffect, useState } from 'react'
import { getAllConnections } from '../../../redux/slices/proposals';
import { dispatch } from '../../../redux/store';
import ConnectionTable from '../../../components/Table/ConnectionTable';

export default function Connection() {
    const [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await localStorage.getItem("user");
          if (!userData) {
            throw new Error("User data not found in local storage");
          }
          const id = JSON.parse(userData)._id;
          const requestsData = await dispatch(getAllConnections("accepted",id));
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
   <ConnectionTable user={data} heading={"All Connections"} role={"student"}/>
   </>
  )
}
