import React, { useEffect, useState } from 'react'
import { getAllConnections } from '../../../redux/slices/proposals';
import { dispatch } from '../../../redux/store';
import AdminConnection from '../../../components/Table/AdminConnection';
import { useSelector } from 'react-redux';

export default function AllConnections() {
    const data = useSelector((state)=>state.proposal.connection)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await localStorage.getItem("user");
          if (!userData) {
            throw new Error("User data not found in local storage");
          }
          const id = JSON.parse(userData)._id;
          const requestsData = await dispatch(getAllConnections("accepted",id));
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []); 

  return (
   <>
   <AdminConnection user={data} heading={"Student Teacher Connections"}/>
   </>
  )
}