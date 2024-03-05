import React, { useEffect, useState } from 'react'
import { dispatch } from '../../../redux/store'
import { getUser } from '../../../redux/slices/admin';
import UserDetailsTable from '../../../components/Table/UserDetailsTable';

export default function AllUsers() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await localStorage.getItem("user");
        if (!userData) {
          throw new Error("User data not found in local storage");
        }
        const id = JSON.parse(userData)._id;
        const requestsData = await dispatch(getUser("student",id));
        setData(requestsData.data)
        console.log(requestsData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); 
  return (
    <>
    <UserDetailsTable user={data}  heading={"Student Details"} />
    </>
  )
}
