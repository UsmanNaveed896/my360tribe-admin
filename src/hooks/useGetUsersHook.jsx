import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetUsersHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users,setUsers]=useState()
  const [loginResponse, setLoginResponse] = useState(false);
  let token = localStorage.getItem("token");
  const handleGetUsers = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://backend-api.my360tribe.org/api/v1/users",{headers})
      .then((res) => {

        if (res?.status == 200) {
          setUsers(res?.data?.data?.data)
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditUsers = (data) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .patch(`https://backend-api.my360tribe.org/api/v1/users/${data._id}`,data,{headers})
      .then((res) => {
  
        if (res?.status == 200) {
        
        toast.success("Users Updated Successfully!")
        setLoginResponse(true)
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleDelete = (id) => {
    setLoginResponse(false)
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .delete(`https://backend-api.my360tribe.org/api/v1/users/${id}`,{headers})
      .then((res) => {

        if (res?.status == 204) {
        
        toast.success("User Deleted Successfully!")
        setLoginResponse(true)
    
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err?.response?.data?.message);
      });
  };
  return {
    handleGetUsers,
    handleEditUsers,
    handleDelete,
    users,
    loading,
    loginResponse,
  };
};
